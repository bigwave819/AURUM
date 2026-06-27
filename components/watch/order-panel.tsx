// components/shop/order-panel.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

interface OrderPanelProps {
  watch: {
    id: string;
    name: string;
    image: string;
    price: number;
    brand: { name: string };
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);
}

export function OrderPanel({ watch }: OrderPanelProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    addItem(
      {
        watchId: watch.id,
        name: watch.name,
        image: watch.image,
        price: watch.price,
        brandName: watch.brand.name,
      },
      quantity
    );

    toast.success("Added to cart", {
      description: `${quantity} × ${watch.name}`,
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
        onClick={handleAddToCart}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-[12.5px] tracking-wide uppercase rounded-md transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
      >
        <ShoppingBag size={15} />
        Add to cart — {formatPrice(watch.price * quantity)}
      </button>
    </div>
  );
}