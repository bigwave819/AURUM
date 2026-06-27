"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useCartHydrated } from "@/hooks/use-cart-hydrated";
import { createOrderFromCart } from "@/actions/user-actions";
import { useSession } from "@/lib/auth-client";
import { EASE_OUT } from "@/lib/motion";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
};

export default function CartPage() {
  const hydrated = useCartHydrated();
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);

  async function handlePlaceOrder() {
    if (!session?.user) {
      toast.error("Sign in to place an order", {
        action: { label: "Sign in", onClick: () => router.push("/auth") },
      });
      return;
    }

    setPlacing(true);
    const result = await createOrderFromCart(
      items.map((i) => ({ watchId: i.watchId, quantity: i.quantity }))
    );
    setPlacing(false);

    if (!result.success) {
      toast.error(result.error ?? "Something went wrong.");
      return;
    }

    toast.success("Order placed", {
      description: "We'll be in touch shortly to confirm details.",
    });
    clearCart();
    router.push("/watch");
  }

  if (!hydrated) return null; // avoid flashing an empty cart before localStorage loads

  return (
    <div style={{ backgroundColor: "#FFF8F3" }} className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h1
          className="text-3xl mb-8"
          style={{ color: "#3A2F22", fontFamily: "var(--font-serif, Georgia, serif)" }}
        >
          Your cart
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag size={28} style={{ color: "#D4B896" }} className="mb-3" />
            <p className="text-sm font-medium mb-1" style={{ color: "#3A2F22" }}>
              Your cart is empty
            </p>
            <p className="text-xs mb-6" style={{ color: "#9E9185" }}>
              Browse the catalogue to find your next piece.
            </p>
            <Link
              href="/watch"
              className="text-xs font-medium px-5 py-2.5 rounded-md"
              style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
            >
              View catalogue
            </Link>
          </div>
        ) : (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col gap-4 mb-8"
            >
              {items.map((item) => (
                <motion.div
                  key={item.watchId}
                  variants={itemVariants}
                  layout
                  className="flex items-center gap-4 p-4 rounded-lg"
                  style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
                >
                  <div
                    className="relative w-16 h-16 rounded-md overflow-hidden shrink-0"
                    style={{ backgroundColor: "#F5EDE3" }}
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] tracking-wide uppercase mb-0.5" style={{ color: "#B5A088" }}>
                      {item.brandName}
                    </p>
                    <h3 className="text-sm font-medium truncate" style={{ color: "#3A2F22" }}>
                      {item.name}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: "#745A27" }}>
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-2.5 rounded-md px-2.5 py-1"
                    style={{ border: "0.5px solid #E0D5C8" }}
                  >
                    <button
                      onClick={() => updateQuantity(item.watchId, item.quantity - 1)}
                      style={{ color: "#4D463A" }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="text-sm w-4 text-center" style={{ color: "#3A2F22" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.watchId, item.quantity + 1)}
                      disabled={item.quantity >= 10}
                      style={{ color: "#4D463A" }}
                      className="disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.watchId)}
                    className="p-2 rounded-md transition-colors hover:bg-[#FCEBEB]"
                    style={{ color: "#9E9185" }}
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </motion.div>
              ))}
            </motion.div>

            <div
              className="flex items-center justify-between p-5 rounded-lg mb-6"
              style={{ backgroundColor: "#F5EDE3", border: "0.5px solid #D4B896" }}
            >
              <span className="text-sm font-medium" style={{ color: "#3A2F22" }}>
                Total
              </span>
              <span className="text-xl" style={{ color: "#745A27" }}>
                {formatPrice(totalPrice())}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full py-4 text-[12.5px] tracking-wide uppercase rounded-md transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
            >
              {placing ? "Placing order…" : "Place order"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}