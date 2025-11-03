// /src/routes/test/index.tsx

import { useEffect, useState, Profiler } from "react";
import { createFileRoute } from '@tanstack/react-router'
import { people, type Person } from "@/data/personData.ts";

export const Route = createFileRoute('/test/')({
    component: Test,
})

function Test() {

    const [count, setCount] = useState(0)
    const [sort, setSort] = useState<"id" | "firstName" | "lastName" | "email" | "phone" >('id')
    const [data, setData] = useState<Person[]>([])

    const onRenderCallback = (
        _id: string,
        _phase: "mount" | "update" | "nested-update",
        actualDuration: number
    ) => {
        console.log(`actualDuration: ${actualDuration.toFixed(2)}ms`);
    };

    useEffect(() => {
        setData(people)
    }, [])

    return <div>
        <h2>Hello "/test/"!</h2>

        <div className='flex gap-1'>
            <button className='p-3 text-white bg-gray-700 cursor-pointer' onClick={() => setSort('id')}>ID</button>
            <button className='p-3 text-white bg-gray-700 cursor-pointer' onClick={() => setSort('firstName')}>FirstName</button>
        </div>
        <div>
            <h3>Page Level Counter {count}</h3>
            <button onClick={() => setCount(count + 1)}>count</button>
        </div>

        {/* Table*/}
        <table className='w-full border border-indigo-600 p-2'>
            <thead className='border-b border-gray-600'>
                <tr className='text-gray-800 text-lg'>
                    <th className='py-2'>id</th>
                    <th className='py-2'>FirstName</th>
                    <th className='py-2'>LastName</th>
                    <th className='py-2'>Email</th>
                    <th className='py-2'>Phone</th>
                </tr>
            </thead>
            <Profiler id="TableBody" onRender={onRenderCallback}>
                <TableBody data={data} sort={sort} />
            </Profiler>
        </table>
    </div>
}

function TableBody({data, sort}: { data: Person[]; sort: "id" | "firstName" | "lastName" | "email" | "phone" }) {

    // Page Level Counter 부분을 클릭하여, re-render 를 일으키면, TableBody 는 메모이제이션된 JSX를 사용하여 리렌더가 일어나지 않는다.
    // 만약 컴파일러 옵션을 끄면, 우리가 알 듯이 부모 컴포넌트가 재랜더링이 일어나므로 TableBody 도 재랜더링이 발생
    console.log('table body render..')

    const sortedData = data.length === 0 ? [] : data.toSorted((a, b) => {
        if(a[sort] < b[sort]) return -1
        if(a[sort] > b[sort]) return 1
        return 0
    })

    return (
        <tbody className='text-center '>
        {sortedData.length > 0 && sortedData.map((person: Person) => (
            <tr key={person.id}>
                <td className='py-1'>{person.id}</td>
                <td className='py-1'>{person.firstName}</td>
                <td className='py-1'>{person.lastName}</td>
                <td className='py-1'>{person.email}</td>
                <td className='py-1'>{person.phone}</td>
            </tr>
        ))}
        </tbody>
    )
}