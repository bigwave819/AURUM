// components/admin/brands/create-brand-dialog.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createBrand } from "@/actions/admin-actions";
import { BrandForm } from "./brand-form";

export function CreateBrandDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}>
          <Plus size={16} className="mr-1.5" />
          Add brand
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new brand</DialogTitle>
        </DialogHeader>
        <BrandForm
          onSubmit={createBrand}
          submitLabel="Create brand"
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}