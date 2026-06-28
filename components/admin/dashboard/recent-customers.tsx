// components/admin/dashboard/recent-customers.tsx
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentCustomersProps {
  customers: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    createdAt: Date;
  }[];
}

function getInitials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function RecentCustomers({ customers }: RecentCustomersProps) {
  return (
    <div
      className="p-5 rounded-lg"
      style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          Recent customers
        </p>
        <Link href="/admin/customers" className="text-xs font-medium" style={{ color: "#745A27" }}>
          View all
        </Link>
      </div>

      {customers.length === 0 ? (
        <p className="text-xs py-6 text-center" style={{ color: "#9E9185" }}>
          No customers yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {customers.map((customer) => (
            <div key={customer.id} className="flex flex-col items-center text-center gap-2">
              <Avatar className="h-11 w-11">
                <AvatarImage src={customer.image ?? undefined} alt={customer.name} />
                <AvatarFallback style={{ backgroundColor: "#745A27", color: "#FFF8F3" }} className="text-xs font-medium">
                  {getInitials(customer.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium truncate max-w-25" style={{ color: "#3A2F22" }}>
                  {customer.name}
                </p>
                <p className="text-[10px]" style={{ color: "#9E9185" }}>
                  Joined {formatDate(customer.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}