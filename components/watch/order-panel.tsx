// components/shop/order-panel.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { createOrder } from "@/actions/user-actions";
import { useSession } from "@/lib/auth-client";

interface OrderPanelProps {
  watchId: string;
  price: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

export function OrderPanel({ watchId, price }: OrderPanelProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleOrder() {
    if (!session?.user) {
      toast.error("Sign in to place an order", {
        action: { label: "Sign in", onClick: () => router.push("/auth") },
      });
      return;
    }

    setLoading(true);
    const result = await createOrder(watchId, quantity);
    setLoading(false);

    if (!result.success) {
      toast.error(result.error ?? "Something went wrong.");
      return;
    }

    toast.success("Order placed", {
      description: `${quantity} × ${formatPrice(price)} — we'll be in touch shortly.`,
    });
    setQuantity(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium" style={{ color: "#9E9185" }}>
          Quantity
        </span>
        <div
          className="flex items-center gap-3 rounded-md px-3 py-1.5"
          style={{ border: "0.5px solid #E0D5C8" }}
        >
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="disabled:opacity-30"
            style={{ color: "#4D463A" }}
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm w-5 text-center" style={{ color: "#3A2F22" }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            disabled={quantity >= 10}
            className="disabled:opacity-30"
            style={{ color: "#4D463A" }}
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <button
        onClick={handleOrder}
        disabled={loading}
        className="w-full sm:w-auto px-8 py-3.5 text-[12.5px] tracking-wide uppercase rounded-md transition-opacity disabled:opacity-60"
        style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
      >
        {loading ? "Placing order…" : `Place order — ${formatPrice(price * quantity)}`}
      </button>

      <p className="text-[11px]" style={{ color: "#B5A088" }}>
        Our team will contact you to confirm details and arrange payment.
      </p>
    </div>
  );
}