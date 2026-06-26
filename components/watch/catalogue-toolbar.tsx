// components/shop/catalogue-toolbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EASE_OUT } from "@/lib/motion";

interface Brand {
  id: string;
  name: string;
}

interface CatalogueToolbarProps {
  brands: Brand[];
  initialSearch: string;
  initialBrandId: string;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  onFilterChange: (params: Record<string, string>) => void;
}

export function CatalogueToolbar({
  brands,
  initialSearch,
  initialBrandId,
  view,
  onViewChange,
  onFilterChange,
}: CatalogueToolbarProps) {
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search !== initialSearch) onFilterChange({ search });
    }, 350);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
      className="flex flex-col gap-4 mb-8 sticky top-0 z-10 pt-2 pb-4"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 sm:max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#9E9185" }}
          />
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
            style={{ borderColor: "#E0D5C8" }}
          />
        </div>

        {/* Grid / list toggle */}
        <div
          className="flex items-center gap-1 rounded-md p-1 self-start sm:self-auto"
          style={{ backgroundColor: "#F5EDE3", border: "0.5px solid #E0D5C8" }}
        >
          <button
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
            className="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
            style={{
              backgroundColor: view === "grid" ? "white" : "transparent",
              color: view === "grid" ? "#745A27" : "#9E9185",
              border: view === "grid" ? "0.5px solid #D4B896" : "none",
            }}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => onViewChange("list")}
            aria-label="List view"
            className="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
            style={{
              backgroundColor: view === "list" ? "white" : "transparent",
              color: view === "list" ? "#745A27" : "#9E9185",
              border: view === "list" ? "0.5px solid #D4B896" : "none",
            }}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Brand pills — horizontal scroll on mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
        <button
          onClick={() => onFilterChange({ brandId: "" })}
          className="shrink-0 px-4 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors"
          style={{
            backgroundColor: !initialBrandId ? "#745A27" : "white",
            color: !initialBrandId ? "#FFF8F3" : "#4D463A",
            border: !initialBrandId ? "1px solid #745A27" : "1px solid #E0D5C8",
          }}
        >
          All brands
        </button>
        {brands.map((brand) => {
          const active = initialBrandId === brand.id;
          return (
            <button
              key={brand.id}
              onClick={() => onFilterChange({ brandId: brand.id })}
              className="shrink-0 px-4 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors"
              style={{
                backgroundColor: active ? "#745A27" : "white",
                color: active ? "#FFF8F3" : "#4D463A",
                border: active ? "1px solid #745A27" : "1px solid #E0D5C8",
              }}
            >
              {brand.name}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}