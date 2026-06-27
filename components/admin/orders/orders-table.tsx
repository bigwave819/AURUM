// components/admin/orders/orders-table.tsx
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrderStatusBadge } from "./order-status-badge";

interface Order {
  id: string;
  totalAmount: number;
  status: "PENDING" | "DELIVERED";
  createdAt: Date;
  user: { id: string; name: string; email: string; image: string | null };
  items: { id: string }[];
}

interface OrdersTableProps {
  orders: Order[];
}

function getInitials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border py-16 text-center">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          No orders yet
        </p>
        <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
          Orders will show up here once customers start buying.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-x-auto" style={{ borderColor: "#E8DDD0" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={order.user.image ?? undefined} alt={order.user.name} />
                    <AvatarFallback
                      style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
                      className="text-[11px] font-medium"
                    >
                      {getInitials(order.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#3A2F22" }}>
                      {order.user.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: "#9E9185" }}>
                      {order.user.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm" style={{ color: "#4D463A" }}>
                  {order.items.length} item{order.items.length === 1 ? "" : "s"}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium" style={{ color: "#745A27" }}>
                  {formatPrice(order.totalAmount)}
                </span>
              </TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell>
                <span className="text-sm" style={{ color: "#9E9185" }}>
                  {formatDate(order.createdAt)}
                </span>
              </TableCell>
              <TableCell>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-xs font-medium"
                  style={{ color: "#745A27" }}
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}