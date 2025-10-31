import { cachedFetchDataWithCancellation } from "@/utils/mock.utils";

export default function CacheSignalChild2() {

    // 성공적으로, 렌더링이 완료되면 AbortSignal 이 aborted 함.
    cachedFetchDataWithCancellation('page2')

    return (
        <>
            <h2>CacheSignalChild2</h2>
        </>
    )
}