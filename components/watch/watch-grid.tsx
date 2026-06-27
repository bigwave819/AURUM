// components/shop/watch-grid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface Watch {
  id: string;
  name: string;
  image: string;
  price: number;
  brand: { id: string; name: string };
}

interface WatchGridProps {
  watches: Watch[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

export function WatchGrid({ watches }: WatchGridProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      key={watches.map((w) => w.id).join("-")}
      className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
    >
      {watches.map((watch) => (
        <motion.div key={watch.id} variants={cardVariants} layout>
          <Link href={`/watch/${watch.id}`} className="group block">
            <div
              className="relative aspect-square overflow-hidden mb-3"
              style={{ backgroundColor: "#F5EDE3" }}
            >
              <Image
                src={watch.image}
                alt={watch.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="text-[11px] tracking-[0.08em] uppercase mb-1" style={{ color: "#B5A088" }}>
              {watch.brand.name}
            </p>
            <h3 className="text-sm font-medium mb-1 leading-snug" style={{ color: "#3A2F22" }}>
              {watch.name}
            </h3>
            <p className="text-sm" style={{ color: "#745A27" }}>
              {formatPrice(watch.price)}
            </p>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}