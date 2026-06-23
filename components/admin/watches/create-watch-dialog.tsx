// components/admin/watches/create-watch-dialog.tsx
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
import { createWatch } from "@/actions/admin-actions";
import { WatchForm } from "./watch-form";

interface CreateWatchDialogProps {
  brands: { id: string; name: string }[];
}

export function CreateWatchDialog({ brands }: CreateWatchDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}>
          <Plus size={16} className="mr-1.5" />
          Add watch
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a new watch</DialogTitle>
        </DialogHeader>
        <WatchForm
          brands={brands}
          onSubmit={createWatch}
          submitLabel="Create watch"
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}