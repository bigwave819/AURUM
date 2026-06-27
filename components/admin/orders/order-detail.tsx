// components/admin/orders/order-detail.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderStatusControl } from "./order-status-control";

interface OrderDetailProps {
  order: {
    id: string;
    totalAmount: number;
    status: "PENDING" | "DELIVERED";
    createdAt: Date;
    user: { id: string; name: string; email: string; image: string | null };
    items: {
      id: string;
      quantity: number;
      price: number;
      watch: { id: string; name: string; image: string; brand: { name: string } };
    }[];
  };
}

function getInitials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrderDetail({ order }: OrderDetailProps) {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1.5 text-xs font-medium"
        style={{ color: "#9E9185" }}
      >
        <ChevronLeft size={14} />
        Back to orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium" style={{ color: "#3A2F22" }}>
            Order #{order.id.slice(0, 8)}
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9E9185" }}>
            Placed {formatDate(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Customer card */}
      <div
        className="flex items-center gap-3 p-4 rounded-lg"
        style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src={order.user.image ?? undefined} alt={order.user.name} />
          <AvatarFallback style={{ backgroundColor: "#745A27", color: "#FFF8F3" }} className="text-xs font-medium">
            {getInitials(order.user.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
            {order.user.name}
          </p>
          <p className="text-xs" style={{ color: "#9E9185" }}>
            {order.user.email}
          </p>
        </div>
      </div>

      {/* Line items */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
      >
        {order.items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4"
            style={{ borderBottom: i < order.items.length - 1 ? "0.5px solid #E8DDD0" : "none" }}
          >
            <div
              className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0"
              style={{ backgroundColor: "#F5EDE3" }}
            >
              <Image src={item.watch.image} alt={item.watch.name} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[11px] tracking-wide uppercase mb-0.5" style={{ color: "#B5A088" }}>
                {item.watch.brand.name}
              </p>
              <p className="text-sm font-medium truncate" style={{ color: "#3A2F22" }}>
                {item.watch.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#9E9185" }}>
                Qty {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>

            <p className="text-sm font-medium" style={{ color: "#745A27" }}>
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div
        className="flex items-center justify-between p-4 rounded-lg"
        style={{ backgroundColor: "#F5EDE3", border: "0.5px solid #D4B896" }}
      >
        <span className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          Order total
        </span>
        <span className="text-lg" style={{ color: "#745A27" }}>
          {formatPrice(order.totalAmount)}
        </span>
      </div>

      {/* Status control */}
      <OrderStatusControl orderId={order.id} currentStatus={order.status} />
    </div>
  );
}