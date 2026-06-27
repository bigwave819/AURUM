// components/admin/orders/order-status-control.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { updateOrderStatus } from "@/actions/admin-actions";

interface OrderStatusControlProps {
  orderId: string;
  currentStatus: "PENDING" | "DELIVERED";
}

export function OrderStatusControl({ orderId, currentStatus }: OrderStatusControlProps) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(value: string) {
    setUpdating(true);
    setError(null);

    const result = await updateOrderStatus(orderId, value as "PENDING" | "DELIVERED");

    setUpdating(false);

    if (!result.success) {
      setError(result.error ?? "Something went wrong.");
      return;
    }

    router.refresh();
  }

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg"
      style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
    >
      <Label className="text-sm font-medium" style={{ color: "#3A2F22" }}>
        Update status
      </Label>
      <Select value={currentStatus} onValueChange={handleChange} disabled={updating}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="DELIVERED">Delivered</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}