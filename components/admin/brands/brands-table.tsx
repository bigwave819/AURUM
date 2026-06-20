// components/admin/brands/brands-table.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BrandRowActions } from "./brand-row-actions";

interface Brand {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  _count: { watches: number };
}

interface BrandsTableProps {
  brands: Brand[];
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BrandsTable({ brands }: BrandsTableProps) {
  if (brands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border py-16 text-center">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          No brands yet
        </p>
        <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
          Add your first brand to start listing watches.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border" style={{ borderColor: "#E8DDD0" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Watches</TableHead>
            <TableHead>Added</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>
                <span className="text-sm font-medium" style={{ color: "#3A2F22" }}>
                  {brand.name}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className="text-sm line-clamp-1 max-w-70 inline-block"
                  style={{ color: "#4D463A" }}
                >
                  {brand.description || "—"}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  style={{ backgroundColor: "#F5EDE3", color: "#745A27", borderColor: "#D4B896" }}
                >
                  {brand._count.watches}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm" style={{ color: "#9E9185" }}>
                  {formatDate(brand.createdAt)}
                </span>
              </TableCell>
              <TableCell>
                <BrandRowActions brand={brand} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}