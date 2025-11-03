// /src/routes/about/index.tsx

// 'use no memo'

import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";

export const Route = createFileRoute('/about/')({
    component: About,
})

function About() {

    const [count, setCount] = useState(0)

    return <>
        <div>Hello "/about/"!</div>
        <p>{count}</p>
        <button className='border-indigo-600 font-semibold text-white bg-indigo-600 p-2 cursor-pointer' onClick={() => setCount(count + 1)}>count +</button>
    </>
}
