// components/admin/watches/edit-watch-dialog.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateWatch } from "@/actions/admin-actions";
import { WatchForm } from "./watch-form";

interface EditWatchDialogProps {
  watch: {
    id: string;
    name: string;
    brandId: string;
    price: number;
    description: string | null;
    image: string;
  };
  brands: { id: string; name: string }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditWatchDialog({ watch, brands, open, onOpenChange }: EditWatchDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit watch</DialogTitle>
        </DialogHeader>
        <WatchForm
          brands={brands}
          defaultValues={{
            name: watch.name,
            brandId: watch.brandId,
            price: watch.price,
            description: watch.description ?? "",
            image: watch.image,
          }}
          onSubmit={(values) => updateWatch(watch.id, values)}
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