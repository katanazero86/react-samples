import { cachedFetchDataWithCancellation } from "@/utils/mock.utils";
import { redirect } from "next/navigation";

export default async function CacheSignalChild3() {

    cachedFetchDataWithCancellation('page3') // 사전 요청

    await new Promise(resolve => setTimeout(resolve, 1500))
    redirect('/signal?page=page3')

    // 도달하지 못함.
    return (
        <h2>
            CacheSignalChild3
        </h2>
    )
}