import { cachedFetchDataWithCancellation } from "@/utils/mock.utils";

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