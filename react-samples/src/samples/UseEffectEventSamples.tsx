import { useEffect, useEffectEvent, useState } from "react";

/**
 * useEffectEvent 는 effect 함수내에서만 호출해야하며, effect 바로 앞에 정의
 * useEffect() 는 두 번째 인자로 의존성 배열을 지니고 있는데, 이때 의존하는 값을 나열하고 이 값이 변경될 때마다 effect 함수를 재실행 -> 하지만, 어떤 경우에는 effect 함수를 재실행 하지 않고 가장 최근의 props, state 를 읽고 싶을 수 있음
 */
export default function UseEffectEventSamples() {
    const [items, setItems] = useState<{ id: number; name: string }[]>([{
        id: 1,
        name: '가그린'
    }, {
        id: 2,
        name: '리스테린'
    }, {
        id: 3,
        name: '애니그린'
    }]);

    const [currentPage, setCurrentPage] = useState('/home');

    const numberOfItems = items.length;

    const notifyMessage = useEffectEvent((message: string) => {
        console.log(message);
    })

    useEffect(() => {
        notifyMessage('mounted')
    }, [])


    // 로그를 남기는데, currentPage 만 변경될 때마다 작업을 하고 싶음.
    // numberOfItems 를 로그를 남겨야함. -> 이걸 의존성 배열에 추가하면 매번 로그를 남기는 로직이 실행이됨. 그저 이 값이(최신) 필요함.
    // numberOfItems를 의존성에서 빼면 오래된 값(stale)을 참조함 = stale closer
    useEffect(() => {
        console.log('log', currentPage, numberOfItems);
    }, [currentPage, numberOfItems]);

    // numberOfItems 를 useEffect 반응성에서 제외
    // 항상 최신값 사용 = 라이브 참조
    // 실행 시, 어떤 최신 값을 참조할지를 결정
    const log = useEffectEvent(() => {
        console.log('log(event)', currentPage, numberOfItems);
    })

    useEffect(() => {
        log()
    }, [currentPage]);

    return (
        <>
            <h2>UseEffectEventSamples</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setCurrentPage('/home')}>홈</button>
                <button onClick={() => setCurrentPage('/products')}>상품</button>
            </div>
            <p>현재 페이지: <strong>{currentPage}</strong></p>
            <p>numberOfItems: {numberOfItems} </p>
        </>
    )
}