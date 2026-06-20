// app/admin/customers/page.tsx
import { getAllUsers } from "@/actions/admin-actions";
import { CustomersTable } from "@/components/admin/customers/customers-table";
import { CustomersPagination } from "@/components/admin/customers/customers-pagination";

interface CustomersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CustomersPage({ searchParams }: CustomersPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const result = await getAllUsers({ page, limit: 10 });

  if (!result.success || !result.data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          Couldn't load customers
        </p>
        <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
          {result.error ?? "Something went wrong while fetching users."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium" style={{ color: "#3A2F22" }}>
          Customers
        </h1>
        <p className="text-sm mt-1" style={{ color: "#9E9185" }}>
          {result.pagination.totalCount} total
        </p>
      </div>

      <CustomersTable users={result.data} />

      <CustomersPagination
        currentPage={result.pagination.currentPage}
        totalPages={result.pagination.totalPages}
        hasNextPage={result.pagination.hasNextPage}
        hasPrevPage={result.pagination.hasPrevPage}
      />
    </div>
  );
}