// components/admin/dashboard/recent-orders.tsx
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrderStatusBadge } from "@/components/admin/orders/order-status-badge";

interface RecentOrdersProps {
  orders: {
    id: string;
    totalAmount: number;
    status: "PENDING" | "DELIVERED";
    createdAt: Date;
    user: { name: string; email: string; image: string | null };
  }[];
}

function getInitials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div
      className="p-5 rounded-lg"
      style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          Recent orders
        </p>
        <Link href="/admin/orders" className="text-xs font-medium" style={{ color: "#745A27" }}>
          View all
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-xs py-6 text-center" style={{ color: "#9E9185" }}>
          No orders yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="flex items-center gap-3 p-2 -mx-2 rounded-md transition-colors hover:bg-[#FBF6EF]"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={order.user.image ?? undefined} alt={order.user.name} />
                <AvatarFallback style={{ backgroundColor: "#745A27", color: "#FFF8F3" }} className="text-[11px] font-medium">
                  {getInitials(order.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "#3A2F22" }}>
                  {order.user.name}
                </p>
                <p className="text-xs truncate" style={{ color: "#9E9185" }}>
                  {order.user.email}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium" style={{ color: "#745A27" }}>
                  {formatPrice(order.totalAmount)}
                </p>
                <OrderStatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}