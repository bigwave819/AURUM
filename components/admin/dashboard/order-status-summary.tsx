// components/admin/dashboard/order-status-summary.tsx
interface OrderStatusSummaryProps {
  pending: number;
  delivered: number;
}

export function OrderStatusSummary({ pending, delivered }: OrderStatusSummaryProps) {
  const total = pending + delivered;
  const pendingPct = total > 0 ? (pending / total) * 100 : 0;
  const deliveredPct = total > 0 ? (delivered / total) * 100 : 0;

  return (
    <div
      className="p-5 rounded-lg h-full flex flex-col"
      style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
    >
      <p className="text-sm font-medium mb-4" style={{ color: "#3A2F22" }}>
        Order status
      </p>

      <div className="flex-1 flex flex-col justify-center gap-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: "#9E9185" }}>
              Pending
            </span>
            <span className="text-sm font-medium" style={{ color: "#854F0B" }}>
              {pending}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F5EDE3" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${pendingPct}%`, backgroundColor: "#EF9F27" }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: "#9E9185" }}>
              Delivered
            </span>
            <span className="text-sm font-medium" style={{ color: "#2D5F2D" }}>
              {delivered}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F5EDE3" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${deliveredPct}%`, backgroundColor: "#639922" }}
            />
          </div>
        </div>
      </div>

      <p className="text-[11px] mt-4 text-center" style={{ color: "#B5A088" }}>
        {total} order{total === 1 ? "" : "s"} total
      </p>
    </div>
  );
}