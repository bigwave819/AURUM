// components/admin/orders/orders-pagination.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OrdersPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function OrdersPagination({ currentPage, totalPages, hasNextPage, hasPrevPage }: OrdersPaginationProps) {
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
    <div className="flex items-center justify-between">
      <p className="text-xs" style={{ color: "#9E9185" }}>
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={!hasPrevPage} onClick={() => goToPage(currentPage - 1)}>
          <ChevronLeft size={14} className="mr-1" /> Previous
        </Button>
        <Button variant="outline" size="sm" disabled={!hasNextPage} onClick={() => goToPage(currentPage + 1)}>
          Next <ChevronRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}