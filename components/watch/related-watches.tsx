// components/shop/related-watches.tsx
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

interface RelatedWatchesProps {
  watches: Watch[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

export function RelatedWatches({ watches }: RelatedWatchesProps) {
  return (
    <div className="mt-20 sm:mt-28">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-sm font-medium tracking-wide uppercase" style={{ color: "#3A2F22" }}>
          More from {watches[0].brand.name}
        </h2>
        <div className="flex-1 h-px" style={{ backgroundColor: "#E8DDD0" }} />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
      >
        {watches.map((watch) => (
          <motion.div key={watch.id} variants={cardVariants}>
            <Link href={`/watch/${watch.id}`} className="group block">
              <div
                className="relative aspect-square rounded-lg overflow-hidden mb-3"
                style={{ backgroundColor: "#F5EDE3" }}
              >
                <Image
                  src={watch.image}
                  alt={watch.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-medium mb-0.5 truncate" style={{ color: "#3A2F22" }}>
                {watch.name}
              </h3>
              <p className="text-sm" style={{ color: "#745A27" }}>
                {formatPrice(watch.price)}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}