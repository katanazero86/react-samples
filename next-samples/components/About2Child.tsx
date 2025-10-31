import { cachedCreateMocks } from "@/utils/mock.utils";

type About2ChildProps = {
    parentMocks: {id: number, name: string}[]
}

export default function About2Child({ parentMocks }: About2ChildProps) {
    // 데이터 스냅샷 공유 얻기

    const mocks = cachedCreateMocks(1000) // 여기서는 인자 1000이 캐시 key

    console.log('About2Child', parentMocks === mocks)

    return (
        <h2>About2Child</h2>
    )
}