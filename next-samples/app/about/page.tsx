import { cache } from "react";
import { cachedCreateMocks, createMocks } from "@/utils/mock.utils";
import Link from "next/link";

// const cachedCreateMocks = cache(createMocks)

export default function AboutPage() {

    const moocks = cachedCreateMocks(1000)

    return (
        <>
            <h2>AboutPage</h2>
            <Link href="/about2" className='text-indigo-600 underline cursor-pointer'>About2</Link>
            <div className="flex flex-col gap-4 p-2 bg-gray-100">
                {moocks.map(mock => <div key={mock.id}>{mock.name}</div>)}
            </div>
        </>
    )
}