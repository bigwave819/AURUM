// components/admin/customers/role-badge.tsx
import { Badge } from "@/components/ui/badge";

interface RoleBadgeProps {
  role: string | null;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const isAdmin = role === "admin";

  return (
    <Badge
      variant="outline"
      className="font-medium"
      style={
        isAdmin
          ? { backgroundColor: "#F5EDE3", color: "#745A27", borderColor: "#D4B896" }
          : { backgroundColor: "transparent", color: "#4D463A", borderColor: "#E8DDD0" }
      }
    >
      {isAdmin ? "Admin" : "Customer"}
    </Badge>
  );
}