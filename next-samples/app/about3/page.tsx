import About3Child from "@/components/cache/About3Child";
import { cachedGetTodoById } from "@/utils/mock.utils";

export default function About3Page() {

    cachedGetTodoById(1) // 사전에 미리 데이터 가져오기 시작

    return <>
        <h2>About3Page</h2>
        <About3Child />
    </>
}