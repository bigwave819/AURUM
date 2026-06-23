// app/admin/watches/page.tsx
import { getAllWatches } from "@/actions/admin-actions";
import { getAllBrands } from "@/actions/admin-actions";
import { WatchesTable } from "@/components/admin/watches/watches-table";
import { WatchesPagination } from "@/components/admin/watches/watches-pagination";
import { CreateWatchDialog } from "@/components/admin/watches/create-watch-dialog";

interface WatchesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function WatchesPage({ searchParams }: WatchesPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const [watchesResult, brandsResult] = await Promise.all([
    getAllWatches({ page, limit: 10 }),
    getAllBrands({ limit: 100 }),
  ]);

  if (!watchesResult.success || !watchesResult.data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          Couldn't load watches
        </p>
        <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
          {watchesResult.error ?? "Something went wrong while fetching watches."}
        </p>
      </div>
    );
  }

  const brands = brandsResult.success ? brandsResult.data!.map((b) => ({ id: b.id, name: b.name })) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium" style={{ color: "#3A2F22" }}>
            Watches
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9E9185" }}>
            {watchesResult.pagination.totalCount} total
          </p>
        </div>
        <CreateWatchDialog brands={brands} />
      </div>

      <WatchesTable watches={watchesResult.data} brands={brands} />

      <WatchesPagination
        currentPage={watchesResult.pagination.currentPage}
        totalPages={watchesResult.pagination.totalPages}
        hasNextPage={watchesResult.pagination.hasNextPage}
        hasPrevPage={watchesResult.pagination.hasPrevPage}
      />
    </div>
  );
}