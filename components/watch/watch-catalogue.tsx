// components/shop/watch-catalogue.tsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CatalogueToolbar } from "./catalogue-toolbar";
import { WatchGrid } from "./watch-grid";
import { WatchList } from "./watch-list";
import { CataloguePagination } from "./catalogue-pagination";
import { EASE_OUT } from "@/lib/motion";

interface Watch {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string | null;
  brand: { id: string; name: string };
}

interface Brand {
  id: string;
  name: string;
}

interface WatchCatalogueProps {
  watches: Watch[];
  brands: Brand[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  initialSearch: string;
  initialBrandId: string;
}

export function WatchCatalogue({
  watches,
  brands,
  pagination,
  initialSearch,
  initialBrandId,
}: WatchCatalogueProps) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  function updateParams(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div 
      // style={{ backgroundColor: "#FFF8F3" }} 
      className="min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-8"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "#B89660" }}>
            Full catalogue
          </p>
          <h1
            className="text-3xl sm:text-[38px] leading-tight"
            style={{ color: "#3A2F22", fontFamily: "var(--font-serif, Georgia, serif)" }}
          >
            Watches
          </h1>
          <p className="text-sm mt-2" style={{ color: "#9E9185" }}>
            {pagination.totalCount} timepiece{pagination.totalCount === 1 ? "" : "s"}
          </p>
        </motion.div>

        <CatalogueToolbar
          brands={brands}
          initialSearch={initialSearch}
          initialBrandId={initialBrandId}
          view={view}
          onViewChange={setView}
          onFilterChange={updateParams}
        />

        {watches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
              No watches match your search
            </p>
            <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
              Try a different brand or clear your search.
            </p>
          </div>
        ) : view === "grid" ? (
          <WatchGrid watches={watches} />
        ) : (
          <WatchList watches={watches} />
        )}

        <div className="mt-10">
          <CataloguePagination {...pagination} />
        </div>
      </div>
    </div>
  );
}