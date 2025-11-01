import { cachedCreateMocks } from "@/utils/mock.utils";
import Link from "next/link";
import About2Child from "@/components/cache/About2Child";

export default function About2Page() {

    const mocks = cachedCreateMocks(1000)
    const mocks2 = cachedCreateMocks(1000); // 캐시 사용

    console.log('About2Page render..')
    console.log(mocks === mocks2)

    return (
        <>
            <h2>About2Page</h2>
            <Link href="/about" className='text-indigo-600 underline cursor-pointer'>About</Link>
            <div className="flex flex-col gap-4 p-2 bg-gray-100">
                {mocks.map(mock => <div key={mock.id}>{mock.name}</div>)}
            </div>
            <About2Child parentMocks={mocks}/>
        </>
    )
}