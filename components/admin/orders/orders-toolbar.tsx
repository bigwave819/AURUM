"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrdersToolbarProps {
  initialSearch: string;
  status: string;
  sortBy: string;
  sortOrder: string;
}

const sortOptions = [
  { value: "createdAt-desc", label: "Newest first" },
  { value: "createdAt-asc", label: "Oldest first" },
  { value: "totalAmount-desc", label: "Highest total" },
  { value: "totalAmount-asc", label: "Lowest total" },
];

export function OrdersToolbar({ initialSearch, status, sortBy, sortOrder }: OrdersToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);

  function updateParams(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search !== initialSearch) updateParams({ search });
    }, 350);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 sm:max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9E9185" }} />
        <Input
          placeholder="Search by customer name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={status} onValueChange={(value) => updateParams({ status: value })}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All statuses</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="DELIVERED">Delivered</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={`${sortBy}-${sortOrder}`}
        onValueChange={(value) => {
          const [newSortBy, newSortOrder] = value.split("-");
          updateParams({ sortBy: newSortBy, sortOrder: newSortOrder });
        }}
      >
        <SelectTrigger className="w-full sm:w-44">
          <ArrowUpDown size={14} className="mr-1.5" style={{ color: "#9E9185" }} />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}