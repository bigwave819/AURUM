// components/admin/watches/watches-table.tsx
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { WatchRowActions } from "./watch-row-actions";

interface Watch {
  id: string;
  name: string;
  image: string;
  price: number;
  brandId: string;
  description: string | null;
  brand: { id: string; name: string };
}

interface WatchesTableProps {
  watches: Watch[];
  brands: { id: string; name: string }[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);
}

export function WatchesTable({ watches, brands }: WatchesTableProps) {
  if (watches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border py-16 text-center">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          No watches yet
        </p>
        <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
          Add your first watch to start building the catalogue.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border" style={{ borderColor: "#E8DDD0" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16" />
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {watches.map((watch) => (
            <TableRow key={watch.id}>
              <TableCell>
                <div
                  className="w-10 h-10 rounded-md overflow-hidden relative"
                  style={{ backgroundColor: "#F5EDE3" }}
                >
                  <Image src={watch.image} alt={watch.name} fill className="object-cover" />
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium" style={{ color: "#3A2F22" }}>
                  {watch.name}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  style={{ backgroundColor: "#F5EDE3", color: "#745A27", borderColor: "#D4B896" }}
                >
                  {watch.brand.name}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm" style={{ color: "#4D463A" }}>
                  {formatPrice(watch.price)}
                </span>
              </TableCell>
              <TableCell>
                <WatchRowActions watch={watch} brands={brands} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}