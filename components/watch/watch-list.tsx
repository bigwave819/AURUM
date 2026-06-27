// components/shop/watch-list.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

interface Watch {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string | null;
  brand: { id: string; name: string };
}

interface WatchListProps {
  watches: Watch[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

export function WatchList({ watches }: WatchListProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      key={watches.map((w) => w.id).join("-")}
      className="flex flex-col"
      style={{ border: "0.5px solid #E8DDD0", borderRadius: "12px", backgroundColor: "white" }}
    >
      {watches.map((watch, i) => (
        <motion.div key={watch.id} variants={rowVariants} layout>
          <Link
            href={`/watch/${watch.id}`}
            className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 group transition-colors hover:bg-[#FBF6EF]"
            style={{ borderBottom: i < watches.length - 1 ? "0.5px solid #E8DDD0" : "none" }}
          >
            <div
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden shrink-0"
              style={{ backgroundColor: "#F5EDE3" }}
            >
              <Image
                src={watch.image}
                alt={watch.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[11px] tracking-[0.08em] uppercase mb-0.5" style={{ color: "#B5A088" }}>
                {watch.brand.name}
              </p>
              <h3 className="text-sm font-medium truncate" style={{ color: "#3A2F22" }}>
                {watch.name}
              </h3>
              {watch.description && (
                <p className="text-xs mt-0.5 truncate hidden sm:block" style={{ color: "#9E9185" }}>
                  {watch.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <p className="text-sm font-medium" style={{ color: "#745A27" }}>
                {formatPrice(watch.price)}
              </p>
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
                style={{ color: "#B5A088" }}
              />
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}