// components/admin/customers/customers-table.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RoleBadge } from "./role-badge";
import { CustomerRowActions } from "./customer-row-actions";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string | null;
  createdAt: Date;
}

interface CustomersTableProps {
  users: User[];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function CustomersTable({ users }: CustomersTableProps) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border py-16 text-center">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          No customers yet
        </p>
        <p className="text-xs mt-1" style={{ color: "#9E9185" }}>
          New sign-ups will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border" style={{ borderColor: "#E8DDD0" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image ?? undefined} alt={user.name} />
                    <AvatarFallback
                      style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
                      className="text-[11px] font-medium"
                    >
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium" style={{ color: "#3A2F22" }}>
                    {user.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm" style={{ color: "#4D463A" }}>
                  {user.email}
                </span>
              </TableCell>
              <TableCell>
                <RoleBadge role={user.role} />
              </TableCell>
              <TableCell>
                <span className="text-sm" style={{ color: "#9E9185" }}>
                  {formatDate(user.createdAt)}
                </span>
              </TableCell>
              <TableCell>
                <CustomerRowActions userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}