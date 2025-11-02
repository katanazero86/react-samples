# next-samples

---

### cache

- React 서버 컴포넌트 전용 API
- 참조: https://react.dev/reference/react/cache

```
import { cache } from 'react';

const cachedFn = cache(fn);
```
- fn 을 인자로 받아, 메모이제이션된 함수를 반환
- 메모이제이션된 함수를 호출하면 결과를 반환하고, 이후에 동일한 인자에 대해서는 캐싱된 결과를 반환
- 해당 캐싱은 요청 내에서만 보장되며, 새요청이 발생하면 캐시는 무효화되고 공유되지 않음
- about 과 about2 에서는 같은 cachedCreateMocks 함수를 사용하지만 라우팅이 일어나면 요청이 변경되므로 메모화된 함수의 캐시를 무효화(각 요청 스코프를 지님)
- cache() 가 호출될 때마다 새로운 메모이제이션 함수 레퍼를 만드므로 컴포넌트 외부 또는 모듈형태로 작성

```
// Temperature.js
import {cache} from 'react';
import {calculateWeekReport} from './report';

export function Temperature({cityData}) {
  // Wrong: 컴포넌트에서 `cache`를 호출하면 각 렌더링에 대해 메모이제이션된 `getWeekReport`가 생성됩니다.
  const getWeekReport = cache(calculateWeekReport);
  const report = getWeekReport(cityData);
  // ...
}
```

- 고비용 연산 캐싱
- 데이터 스냅샷(Data Snapshot)(어떤 시점의 데이터 상태를 그대로 찍어둔 복제본) 공유
- 비동기 작업 캐싱

```
/about -> cache 사용
/about2 -> cache 가 같은 결과를 반환하는지 확인
/about3 -> cache 를 활용한 사전에 미리 데이터 요청해서 가져오기 

```

**cache() 와 Next.js의 Request Memoization 과 어떤 차이가 있는가**
- cache() 는 동일한 인자로 실행된 비동기 기반 함수의 결과를 메모이제이션
- React 렌더링 중 같은 인자 조합의 호출은 한 번만 실행
- 캐시는 서버 요청(Request) 단위로 유지
- 동일한 서버 요청 내에서는 여러 컴포넌트가 같은 cached 된 함수를 호출해도 같은 결과를 사용
- RSC 및 Server Action 에서 사용 가능
- 개발자가 직접 명시적으로 cache() 로 감싸고, 호출하여 사용


- Next.js 13~15에서는 fetch 요청을 자동으로 메모이징   
  즉, 같은 요청 URL과 옵션(method, headers, body, 등)이 일치하면 하나의 fetch 결과를 재사용
- Next.js가 자동으로 수행하는 fetch-level memoization
- fetch() 자체의 입력(URL, 옵션)에 기반(cache: 'force-cache' | 'no-store' | 'reload' | 'default' 등의 옵션으로 캐시 정책을 제어)
- 기본적으로는 같은 요청(Request) 단위에서만 유효 (즉, SSR 한 번 실행 시).
- cache()와는 달리 함수 단위가 아닌 fetch 단위의 메모이제이션   

cache() 는 함수 호출 단위 메모이제이션,   
Next.js의 Request Memoization 은 fetch 호출 단위 자동 메모이제이션이다.
둘 다 SSR 요청 단위로 유지되지만, cache()는 명시적이며 fetch와 무관하게 쓸 수 있고,   
fetch memoization은 Next.js가 자동으로 처리한다

### cacheSignal

- React 서버 컴포넌트 전용 API
- 참조: https://react.dev/reference/react/cacheSignal

```
import { cacheSignal } from 'react'

const signal = cacheSignal();
```

- cacheSignal() 은 반드시 cache() 내부에서 사용하고, fetch는 컴포넌트 렌더링 중에 시작되어야 제대로 동작
```

// 전역에서 fetch 시작 (렌더링 외부)
const userPromise = fetch('/api/user', { 
  signal: cacheSignal() // ❌ 작동 안 함!
});

async function UserProfile() {
  const user = await userPromise;
  return <div>{user.name}</div>
}

// Component가 unmount되어도 fetch는 계속 진행됨!
```

- cacheSignal()은 Server Component에서만 의미가 있음
- 렌더링이 성공적으로 완료되면, signal을 abort 시킴

- 렌더링을 성공적으로 완료 / 렌더링이 중단 / 렌더링이 실패 -> 이 세 가지 경우에 abort 가 일어남
- cacheSignal 은 같은 렌더 패스 내에서만 abort

```
/signal?page=page1 -> 쿼리스트링을 바꾸면, abort 될까? 안됌 = 쿼리스트링이 변경 된다는 것은 새로운 URL이고 서버 컴포넌트가 새로 렌더링이 일어남
Switch Page 2 를 클릭하면, signal?page=page1 에 대한 서버 측 요청이 실행되어 콘솔에 출력되는 것을 확인할 수 있음.
/signal?page=page2 -> data fetch 를 await 로 기다리지 않고 렌더링을 완료하면 abort 가 일어남.(시연을 위한 예제일뿐 좋은 예제는 아님)
/signal?page=page3 -> 1.5초 이후 동일한 URL로 리다이렉트 하고 이전에 진행중인 요청은 abort 가 발생
redirect() 는 서버측에서 실행이 되고, 여기에 다른 URL을 입력하면 컴포넌트 렌더링이 중단된다라는 것을 캐치하기 때문에 abort 가 발생한다.

/signal2 -> 2개의 서버 컴포넌트를 포함하고 있고, 한쪽에서 에러가 발생하면 abort 가 일어날까 하였으나 일어나지 않음.

```

- <Link> 컴포넌트 및 router.push() 를 활용하여 동일한 URL을 요청하더라도 abort 가 발생하지 않음(클라이언트 측 라우팅)

cacheSignal()은 불필요한 네트워크 요청을 취소하고, 취소가 됨으로써 서버 리소스를 절약할 수 있음

Demo 를 만들어보려고 했으나, 생각보다 시연이 자유로운 API가 아니라서 잠시 keep.