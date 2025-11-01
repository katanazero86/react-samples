import { Suspense } from "react";
import CacheSignalChildChild from "@/components/cacheSignal/CacheSignalChildChild";

export default async function CacheSignalChild() {

    return (
        <>
            <h2>CacheSignalChild</h2>
            <Suspense fallback={<p>Loading..</p>}>
                <CacheSignalChildChild />
            </Suspense>
        </>
    )
}