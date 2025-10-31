# react-samples

---

- 19.2 에 추가된 Activity 컴포넌트 샘플 작성
```
import { Activity } from 'react';

<Activity mode={isVisible ? 'visible' : 'hidden'}>
  <Page />
</Activity>
```

### Activity Props

- mode

타입: 'visible' | 'hidden'   
설명: 컴포넌트의 표시 상태를 제어합니다.

- name

타입: string   
설명: 디버깅용 이름을 지정합니다. React DevTools에서 식별할 때 유용합니다.

- children (필수)

타입: ReactNode   
설명: Activity 경계 내부에 렌더링될 자식 컴포넌트

```
// ❌ 일반 조건부 렌더링 - 상태 손실
{tab === 'posts' && <Posts />} // unmount되면 상태 사라짐

// ✅ Activity - 상태 유지
<Activity mode={tab === 'posts' ? 'visible' : 'hidden'}>
    <Posts />
</Activity>
```

1. 상태 보존: hidden 상태에서도 컴포넌트는 마운트된 채로 유지
2. 사전 렌더링: Suspense 지원 데이터 소스는 미리 fetch 가능
3. 상태를 보존하고 있으므로, 메모리 사용량이 증가
4. 공식 문서에서는 video 예제를 들고 있다. 기존 조건부 렌더링 같은 경우에는 초기화가 이루어짐. Activity 컴포넌트는 상태를 유지하기에 재생을 하면 그대로 재생 -> 이를 해결 하려면 직접 ref 를 정의하여 클린업 단계에서 정지하도록 함
5. hidden 인 Activity 는 컴포넌트가 unmount 된걸로 생각해야 함
6. 예전 조건부 렌더링을 통한 상태 유지를 위해 key prop 을 사용하던 방식보다 훨씬 우아한 방법

### useEffectEvent
useEffectEvent는 Effect 내부의 비반응형(non-reactive) 로직을 분리할 수 있게 해주는 훅

반응성(Reactivity): UI 반응성 = 상태 변경 -> UI 갱신 / Effect 반응성 = 특정 값 변경 -> Effect 재실행   
React, Vue 에서 반응성은 UI 반응성을 의미

```
// UI 렌더링 ✅ (가장 명확)
state 변경 → 화면 자동 업데이트

// Computed Values ✅ (Vue, Solid.js)
const double = computed(() => count * 2);

// Effect 실행 ✅ (React useEffect, Vue watch)
count 변경 → Effect 자동 재실행
```

- 기존 방식 문제
```
// useEffect 에 모든 값을 의존성 배열에 넣기(과도한 재실행)

useEffect(() => {
    logPageView(page, userId, cartItems, theme, language);
}, [page, userId, cartItems, theme, language]);
// 😭 theme이나 language 변경 시에도 페이지뷰 로그가...
```

```
// useEffect 분리(복잡도 증가)

// Effect 1: 페이지 변경 감지
useEffect(() => {
    setPageChanged(true);
}, [page]);

// Effect 2: 로그 전송
useEffect(() => {
    if (pageChanged) {
        logPageView(page, userId, cartItems);
        setPageChanged(false);
    }
}, [pageChanged, page, userId, cartItems]);
// 여전히 userId, cartItems 변경 시 실행됨
```

기존에는 어떤 값이 변경되면 effect 함수가 실행 될까라면, 이제는 진짜 재실행 값은 무엇일까를 고민   
effect 함수 로직에서 최신 값 참조가 필요한 경우 useEffectEvent() 사용   
useEffectEvent는 Effect 의존성 지옥에서 벗어나게 해주는 강력한 API
- Stale closure 해결
- 불필요한 재실행 방지
- 깔끔한 코드

useEffectEvent 는 이름 그대로, 이펙트에서 어떤 시점에 발생(또는 호출)하는 이벤트라는 의미를 지님.

