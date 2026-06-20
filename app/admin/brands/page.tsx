// app/admin/brands/page.tsx
import { getAllBrands } from "@/actions/admin-actions";
import { BrandsTable } from "@/components/admin/brands/brands-table";
import { BrandsPagination } from "@/components/admin/brands/brands-pagination";
import { CreateBrandDialog } from "@/components/admin/brands/create-brand-dialog";

interface BrandsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BrandsPage({ searchParams }: BrandsPageProps) {
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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium" style={{ color: "#3A2F22" }}>
            Brands
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9E9185" }}>
            {result.pagination.totalCount} total
          </p>
        </div>
        <CreateBrandDialog />
      </div>

      <BrandsTable brands={result.data} />

      <BrandsPagination
        currentPage={result.pagination.currentPage}
        totalPages={result.pagination.totalPages}
        hasNextPage={result.pagination.hasNextPage}
        hasPrevPage={result.pagination.hasPrevPage}
      />
    </div>
  );
}