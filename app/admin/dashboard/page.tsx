// app/admin/dashboard/page.tsx
import { getDashboardData } from "@/actions/admin-actions";
import { MetricCards } from "@/components/admin/dashboard/metric-cards";
import { RevenueChart } from "@/components/admin/dashboard/revenue-chart";
import { OrderStatusSummary } from "@/components/admin/dashboard/order-status-summary";
import { RecentOrders } from "@/components/admin/dashboard/recent-orders";
import { TopWatches } from "@/components/admin/dashboard/top-watches";
import { RecentCustomers } from "@/components/admin/dashboard/recent-customers";

export default async function DashboardPage() {
  const result = await getDashboardData();

  if (!result.success || !result.data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          Couldn&apos;t load dashboard
        </p>
        <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
          {result.error}
        </p>
      </div>
    );
  }

  const data = result.data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium" style={{ color: "#3A2F22" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#9E9185" }}>
          An overview of how AURUM is doing.
        </p>
      </div>

      <MetricCards
        totalRevenue={data.totalRevenue}
        totalOrders={data.totalOrders}
        totalCustomers={data.totalCustomers}
        totalWatches={data.totalWatches}
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart data={data.chartData} />
        </div>
        <OrderStatusSummary pending={data.pendingOrders} delivered={data.deliveredOrders} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <RecentOrders orders={data.recentOrders} />
        <TopWatches watches={data.topWatches} />
      </div>

      <RecentCustomers customers={data.recentCustomers} />
    </div>
  );
}