// components/admin/dashboard/metric-cards.tsx
import { DollarSign, ShoppingBag, Users, Watch as WatchIcon } from "lucide-react";

interface MetricCardsProps {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalWatches: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW", maximumFractionDigits: 0 }).format(price);
}

export function MetricCards({ totalRevenue, totalOrders, totalCustomers, totalWatches }: MetricCardsProps) {
  const metrics = [
    { label: "Total revenue", value: formatPrice(totalRevenue), icon: DollarSign },
    { label: "Total orders", value: totalOrders.toLocaleString(), icon: ShoppingBag },
    { label: "Customers", value: totalCustomers.toLocaleString(), icon: Users },
    { label: "Watches in catalogue", value: totalWatches.toLocaleString(), icon: WatchIcon },  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {metrics.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex flex-col gap-2 p-4 rounded-lg"
          style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: "#9E9185" }}>
              {label}
            </p>
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ backgroundColor: "#F5EDE3" }}
            >
              <Icon size={14} style={{ color: "#745A27" }} />
            </div>
          </div>
          <p className="text-xl font-medium" style={{ color: "#3A2F22" }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}