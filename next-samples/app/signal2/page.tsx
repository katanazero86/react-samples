import { Suspense } from "react";
import CacheSignalChild4 from "@/components/cacheSignal/CacheSignalChild4";
import CacheSignalChild5 from "@/components/cacheSignal/CacheSignalChild5";
import Link from "next/link";

export default function Signal2Page() {
    return (
        <>
            <div>
                <Link className='text-indigo-600 underline cursor-pointer' href="/signal?page=page1">Signal</Link>
            </div>
            <Suspense fallback={'loading..'}>
                <CacheSignalChild4 />
            </Suspense>
            <CacheSignalChild5 />
        </>
    )
}