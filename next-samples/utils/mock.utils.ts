import { cache, cacheSignal } from "react";

export const createMocks = (length: number = 0) => {

    console.log('createMock calls..')
    const mocks = []

    for(let i = 0; i < length; i++) {
        mocks.push({
            id: i,
            name: `mock-${i}`
        })
    }

    return mocks;
}


export const cachedCreateMocks = cache(createMocks)


async function getTodoById(id: number) {
    console.log('getTodoById calls..')
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    return response.json()
}

export const cachedGetTodoById = cache(getTodoById)


// cacheSignal은 cache() 내부에서만 동작
export const cachedFetchDataWithCancellation = cache(async (targetPage: string = '') => {
    const signal = cacheSignal(); // Get the AbortSignal for the current render pass
    try {
        const response = await fetch(`http://localhost:3000/api/data?page=${targetPage}`, { signal });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error name', (error as Error).name)
        if (signal?.aborted) {
            console.log(`${targetPage}: Data fetch aborted due to render abandonment or completion.`);
        } else {
            console.error('Error fetching data:', error);
        }
        return null;
    }
})