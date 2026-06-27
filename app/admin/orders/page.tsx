// app/admin/orders/page.tsx
import { getAllOrders } from "@/actions/admin-actions";
import { OrdersTable } from "@/components/admin/orders/orders-table";
import { OrdersToolbar } from "@/components/admin/orders/orders-toolbar";
import { OrdersPagination } from "@/components/admin/orders/orders-pagination";

interface OrdersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;
  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const search = params.search ?? "";
  const status =
    params.status === "PENDING" || params.status === "DELIVERED" || params.status === "ALL"
      ? params.status
      : "ALL";
  const sortBy = params.sortBy === "totalAmount" ? "totalAmount" : "createdAt";
  const sortOrder = params.sortOrder === "asc" ? "asc" : "desc";

  const result = await getAllOrders({ page, limit: 10, search, status, sortBy, sortOrder });
  if (!result.success || !result.data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          Couldn&apos;t load orders
        </p>
        <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
          {result.error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium" style={{ color: "#3A2F22" }}>
          Orders
        </h1>
        <p className="text-sm mt-1" style={{ color: "#9E9185" }}>
          {result.pagination.totalCount} total
        </p>
      </div>

      <OrdersToolbar initialSearch={search} status={status} sortBy={sortBy} sortOrder={sortOrder} />

      <OrdersTable orders={result.data} />

      <OrdersPagination
        currentPage={result.pagination.currentPage}
        totalPages={result.pagination.totalPages}
        hasNextPage={result.pagination.hasNextPage}
        hasPrevPage={result.pagination.hasPrevPage}
      />
    </div>
  );
}