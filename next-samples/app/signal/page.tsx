import CacheSignalChild from "@/components/CacheSignalChild";
import CacheSignalChild2 from "@/components/CacheSignalChild2";
import CacheSignalChild3 from "@/components/CacheSignalChild3";
import { PageSwitcher } from "@/components/PageSwitcher";

export default async function SignalPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
    const { page = 'page1' } = await searchParams

    return (
        <>
            <h2>SignalPage</h2>
            <PageSwitcher currentPage={page}/>
                {page === 'page1' ? <CacheSignalChild/> :
                    page === 'page2' ? <CacheSignalChild2/> :
                        <CacheSignalChild3/>}
        </>
    )
}