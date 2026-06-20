// components/admin/customers/customer-row-actions.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, ShieldCheck, Ban } from "lucide-react";

interface CustomerRowActionsProps {
  userId: string;
}

export function CustomerRowActions({ userId }: CustomerRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} style={{ color: "#4D463A" }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => console.log("view", userId)}>
          <Eye size={14} className="mr-2" />
          View details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("make admin", userId)}>
          <ShieldCheck size={14} className="mr-2" />
          Make admin
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => console.log("ban", userId)}
          className="text-red-600 focus:text-red-600"
        >
          <Ban size={14} className="mr-2" />
          Ban customer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}