import { cachedGetTodoById } from "@/utils/mock.utils";

export default async function About3Child() {

    const todo = await cachedGetTodoById(1) // 캐시를 읽어서 사용

    return (
        <div>
            <p>
                {todo.userId} / {todo.id} / {todo.title} / {todo.completed}
            </p>
        </div>
    )
}