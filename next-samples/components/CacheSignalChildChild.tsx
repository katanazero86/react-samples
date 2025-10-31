import { cachedFetchDataWithCancellation } from "@/utils/signal.utils"

// 상위 컴포넌트에서 /signal?page=page2 로 이동하더라도 abort 되지 않는다.
// 이유는 같은 서버 렌더 패스가 아니기 때문이며, 새로운 RSC 요청을 만들어서 요청을 새로 하고, 이전 요청이 버려진 렌더로 취금하지 않음.
// 그래서 라우팅 하더라도, 콘솔이 출력되고 이건 라우트 핸들러에서 req.signal을 사용해서 중단시켜야함.
export default async function CacheSignalChildChild() {

    const data = await cachedFetchDataWithCancellation('page1')
    console.log('CacheSignalChildChild', data)

    return (
        <>
            <h2>CacheSignalChildChild</h2>
            <p>data: {data.message}</p>
        </>
    )
}