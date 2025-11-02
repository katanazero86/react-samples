import { cachedFetchDataWithCancellation } from "@/utils/signal.utils";

export default function CacheSignalChild5() {

    cachedFetchDataWithCancellation('signal2')
    console.log(a) // error

    return (
        <h2>CacheSignalChild5</h2>
    )
}