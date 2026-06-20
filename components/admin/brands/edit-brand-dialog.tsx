// components/admin/brands/edit-brand-dialog.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateBrand } from "@/actions/admin-actions";
import { BrandForm } from "./brand-form";

interface EditBrandDialogProps {
  brand: { id: string; name: string; description: string | null };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBrandDialog({ brand, open, onOpenChange }: EditBrandDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit brand</DialogTitle>
        </DialogHeader>
        <BrandForm
          defaultValues={{ name: brand.name, description: brand.description }}
          onSubmit={(values) => updateBrand(brand.id, values)}
          submitLabel="Save changes"
          onSuccess={() => {
            onOpenChange(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}