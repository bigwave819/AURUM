// components/admin/dashboard/revenue-chart.tsx
"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface RevenueChartProps {
  data: { date: string; revenue: number }[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW", maximumFractionDigits: 0 }).format(price);
}

function formatDateLabel(dateStr: string | number | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function RevenueChart({ data }: RevenueChartProps) {
  const totalInWindow = data.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div
      className="p-5 rounded-lg h-full"
      style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
            Revenue
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#9E9185" }}>
            Last 30 days · {formatPrice(totalInWindow)}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#745A27" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#745A27" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8DDD0" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => formatDateLabel(value)}
            tick={{ fontSize: 11, fill: "#9E9185" }}
            axisLine={{ stroke: "#E8DDD0" }}
            tickLine={false}
            interval={Math.ceil(data.length / 6)}
          />
          <YAxis
            tickFormatter={(value: number) => formatPrice(value)}
            tick={{ fontSize: 11, fill: "#9E9185" }}
            axisLine={false}
            tickLine={false}
            width={70}
          />
          <Tooltip
            formatter={(value) => [formatPrice(Number(value ?? 0)), "Revenue"]}
            labelFormatter={(label) => formatDateLabel(label as string | number | undefined)}
            contentStyle={{
              backgroundColor: "white",
              border: "0.5px solid #E8DDD0",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#745A27"
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}