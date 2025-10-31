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