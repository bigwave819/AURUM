// components/shop/watch-detail.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { OrderPanel } from "./order-panel";

interface Watch {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string | null;
  brand: { id: string; name: string };
}

interface WatchDetailProps {
  watch: Watch;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);
}

export function WatchDetail({ watch }: WatchDetailProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        <Link
          href="/watch"
          className="inline-flex items-center gap-1.5 text-xs font-medium mb-8"
          style={{ color: "#9E9185" }}
        >
          <ChevronLeft size={14} />
          Back to catalogue
        </Link>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-10 sm:gap-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="relative aspect-square rounded-xl overflow-hidden"
          style={{ backgroundColor: "#F5EDE3" }}
        >
          <Image 
            src={watch.image} 
            alt={watch.name} 
            fill 
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover" 
            priority 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
        >
          <p className="text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: "#B89660" }}>
            {watch.brand.name}
          </p>
          <h1
            className="text-3xl sm:text-4xl leading-tight mb-4"
            style={{ color: "#3A2F22", fontFamily: "var(--font-serif, Georgia, serif)" }}
          >
            {watch.name}
          </h1>
          <p className="text-2xl mb-6" style={{ color: "#745A27" }}>
            {formatPrice(watch.price)}
          </p>

          {watch.description && (
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#6B6258" }}>
              {watch.description}
            </p>
          )}

          <OrderPanel watch={watch} />
        </motion.div>
      </div>
    </div>
  );
}