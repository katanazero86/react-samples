'use client'
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function PageSwitcher({ currentPage }: { currentPage: string }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();


    // URL이 바뀌면, 새 요청. 이렇게 전환해도 이전 요청에 비동기 작업은 그냥 끝까지 진행이 됨
    return (
        <div className='flex p-2 gap-2 border border-gray-300'>
            <button
                className='text-indigo-600 underline cursor-pointer'
                onClick={() => {
                    startTransition(() => {
                        router.push('/signal?page=page1');
                    });
                }}>
                Switch Page 1
            </button>
            <button
                className='text-indigo-600 underline cursor-pointer'
                onClick={() => {
                    startTransition(() => {
                        router.push('/signal?page=page2');
                    });
                }}>
                Switch Page 2
            </button>
            <button
                className='text-indigo-600 underline cursor-pointer'
                onClick={() => {
                    startTransition(() => {
                        router.push('/signal?page=page3');
                    });
                }}>
                Switch Page 3
            </button>
        </div>
    );
}