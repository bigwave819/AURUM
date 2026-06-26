// components/shop/catalogue-pagination.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CataloguePaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function CataloguePagination({ currentPage, totalPages, hasNextPage, hasPrevPage }: CataloguePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={!hasPrevPage}
        className="flex items-center gap-1 text-xs font-medium disabled:opacity-40 transition-opacity"
        style={{ color: "#4D463A" }}
      >
        <ChevronLeft size={14} /> Previous
      </button>
      <span className="text-xs" style={{ color: "#9E9185" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNextPage}
        className="flex items-center gap-1 text-xs font-medium disabled:opacity-40 transition-opacity"
        style={{ color: "#4D463A" }}
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  );
}