import { getAllBrands } from "@/actions/admin-actions";
import AddWatchModal from "@/components/admin/watches/Add-watch-modal";
import { Button } from "@/components/ui/button";

interface BrandsPageProps {
    searchParams: Promise<{ page?: string }>;
}

async function WatchPage({ searchParams }: BrandsPageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;

    const result = await getAllBrands({ page, limit: 10 });

    if (!result.success || !result.data) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
                    Couldn't load brands
                </p>
                <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
                    {result.error ?? "Something went wrong while fetching brands."}
                </p>
            </div>
        );
    }

    return (
        <div>
            <div></div>
            <div>
                <AddWatchModal brands={result.data} />
            </div>
        </div>
    );
}

export default WatchPage;