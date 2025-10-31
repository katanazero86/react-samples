import { Activity, Suspense, use, useEffect, useState } from "react";

const fetchData: () => Promise<string[]> = async () => {
    console.log('fetchData called')
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                'Post #1',
                'Post #2',
                'Post #3',
                'Post #4',
                'Post #5',
                'Post #6',
                'Post #7',
                'Post #8',
                'Post #9',
                'Post #10',
                'Post #11',
                'Post #12',
                'Post #13',
                'Post #14',
                'Post #15',
            ])
        }, 3500)
    })
}


function Child1() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('child1 mounted')
        const interval = setInterval(() => {
            console.log('child1 interval hidden 이어도 실행이 될까?') // hidden 상태가 되어도 여전히 실행이 되고 있음.
        }, 1000)
        return () => {
            console.log('child1 unmounted')
            // clearInterval(interval)
        }
    }, [])

    return (
        <>
            <h3>
                child1
            </h3>
            <p>child1 count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                count + 1
            </button>
        </>
    )
}

function Child2() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('child2 mounted')
        return () => {
            console.log('child2 unmounted')
        }
    }, [])

    return (
        <>
            <h3>
                child2
            </h3>
            <p>child2 count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                count + 1
            </button>
        </>
    )
}

function Child3() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('child3 mounted')
        return () => {
            console.log('child3 unmounted')
        }
    }, [])

    return (
        <>
            <h3>
                child3
            </h3>
            <p>child3 count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                count + 1
            </button>
        </>
    )
}

function Home() {
    return (
        <p>Welcome to my profile!</p>
    )
}

type PostsProps = {
    fetchData: Promise<string[]>
}

function Posts({ fetchData }: PostsProps) {
    // const posts = use(fetchData()) as string[] // 이렇게 사용하면, 무한 resolve 대기에 빠짐
    const posts = use(fetchData)

    return (
        <ul>
            {posts.map(post =>
                <li className="item" key={post}>
                    {post}
                </li>
            )}
        </ul>
    )
}

const promiseChache = fetchData()

/**
 * Activity Component 는 mode prop 에 'visible', 'hidden' 두가지 값을 받도록 되어있음
 * hidden 인 경우 해당 Activity Component 경계를 기준으로 요소를 시각적으로 숨김(개발자 도구를 보면, 해당 요소 스타일에 display: none !important 가 지정되어 있음)
 * Activity Component 에 재미있는 점은 숨겨져 있던 컴포넌트를 다시 시각적으로 표시 할 때, 해당 컴포넌트에 상태가 복구가 된다는 점이다.
 *
 * Activity Component 를 활용하여 사전 렌더링도 가능 단, Suspense 가 활성화 되어야 한다.
 * 예제는 캐시된 Promise 방식으로 진행 (순수 React 보다는 Suspense 를 지원하는 프레임워크인 Next.js, Remix 프레임워크를 사용하는 것을 권장하고 있음)
 */
export default function ActivitySamples() {
    const [tab, setTab] = useState(0)
    const [activeTab, setActiveTab] = useState('home')

    return (
        <>
            <div>
                <button onClick={() => setTab(0)}>child1</button>
                <button onClick={() => setTab(1)}>child2</button>
                <button onClick={() => setTab(2)}>child3</button>
            </div>
            <Activity name='child1' mode={tab === 0 ? 'visible' : 'hidden'}>
                <Child1/>
            </Activity>
            <Activity name='child2' mode={tab === 1 ? 'visible' : 'hidden'}>
                <Child2/>
            </Activity>
            <Activity name='child3' mode={tab === 2 ? 'visible' : 'hidden'}>
                <Child3/>
            </Activity>

            <div style={{
                border: '1px dotted red',
                padding: '12px'
            }}>
                <div style={{
                    display: 'flex',
                    padding: '8px 0',
                    gap: '4px',
                    borderBottom: '1px solid gray',
                }}>
                    <button onClick={() => setActiveTab('home')}>Home</button>
                    <button onClick={() => setActiveTab('posts')}>Posts</button>
                </div>

                <div>
                    {/*<Suspense fallback={<h2>🌀 Loading...</h2>}>*/}
                    {/*    {activeTab === 'home' && <Home/>}*/}
                    {/*    {activeTab === 'posts' && <Posts/>}*/}
                    {/*</Suspense>*/}
                    <Suspense fallback={<h2>🌀 Loading...</h2>}>
                        <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
                            <Home />
                        </Activity>
                        <Activity mode={activeTab === 'posts' ? 'visible' : 'hidden'}>
                            {/*매번 새로운 Promise 를 생성, visible 할 때마다 로딩이 표시*/}
                            {/*<Posts fetchData={fetchData()}/>*/}

                            {/*동일한 Promise 객체를 전달, 3.5초 지난 후 확인해보면 사전 렌더링이 되어있고 유지가 되는 것을 확인*/}
                            <Posts fetchData={promiseChache}/>
                        </Activity>
                    </Suspense>
                </div>

            </div>
        </>
    )
}

