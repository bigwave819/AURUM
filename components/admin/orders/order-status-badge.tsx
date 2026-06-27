// components/admin/orders/order-status-badge.tsx
import { Badge } from "@/components/ui/badge";

interface OrderStatusBadgeProps {
  status: "PENDING" | "DELIVERED";
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const isDelivered = status === "DELIVERED";

  return (
    <Badge
      variant="outline"
      style={
        isDelivered
          ? { backgroundColor: "#EAF4EA", color: "#2D5F2D", borderColor: "#A8D5A8" }
          : { backgroundColor: "#FAEEDA", color: "#854F0B", borderColor: "#EF9F27" }
      }
    >
      {isDelivered ? "Delivered" : "Pending"}
    </Badge>
  );
}