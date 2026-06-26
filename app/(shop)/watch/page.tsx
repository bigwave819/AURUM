// app/(shop)/watch/page.tsx
import { getPublicWatches } from "@/actions/user-actions";
import { getAllBrands } from "@/actions/admin-actions";
import { WatchCatalogue } from "@/components/watch/watch-catalogue";

interface WatchesPageProps {
  searchParams: Promise<{ search?: string; brandId?: string; page?: string }>;
}

export default async function WatchesPage({ searchParams }: WatchesPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search ?? "";
  const brandId = params.brandId ?? "";

  const [watchesResult, brandsResult] = await Promise.all([
    getPublicWatches({ page, limit: 12, search, brandId: brandId || undefined }),
    getAllBrands({ limit: 100 }),
  ]);

  const brands = brandsResult.success ? brandsResult.data!.map((b) => ({ id: b.id, name: b.name })) : [];

  if (!watchesResult.success || !watchesResult.data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4" style={{ backgroundColor: "#FFF8F3" }}>
        <p 
          className="text-sm font-medium" 
          // style={{ color: "#3A2F22" }}
        >
          Couldn&apos;t load the catalogue
        </p>
        <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
          {watchesResult.error}
        </p>
      </div>
    );
  }

  return (
    <WatchCatalogue
      watches={watchesResult.data}
      brands={brands}
      pagination={watchesResult.pagination}
      initialSearch={search}
      initialBrandId={brandId}
    />
  );
}