import { cachedFetchDataWithCancellation } from "@/utils/signal.utils";

export default async function CacheSignalChild4() {
    // let isError = false;
    // await new Promise((resolve, reject) => setTimeout(reject, 1000)).catch(() => {
    //     console.log('CacheSignalChild4');
    //     isError = true;
    // });
    //
    // if(isError) { return null }

    const data = await cachedFetchDataWithCancellation('signal2')

    return (
        <h2>CacheSignalChild4</h2>
    )
}