import { cache, cacheSignal } from "react";

export const fetchData = async (targetPage: string = '') => {
    const signal = cacheSignal(); // Get the AbortSignal for the current render pass
    try {
        const response = await fetch(`http://localhost:3000/api/data?page=${targetPage}`, { signal });
        const data = await response.json();
        console.log('signal aborted:', signal?.aborted)
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
}

// cacheSignal은 cache() 내부에서만 동작
export const cachedFetchDataWithCancellation = cache(fetchData)