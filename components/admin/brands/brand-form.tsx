// components/admin/brands/brand-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BrandFormProps {
  defaultValues?: { name: string; description: string | null };
  onSubmit: (values: { name: string; description?: string }) => Promise<{ success: boolean; error?: string }>;
  onSuccess: () => void;
  submitLabel: string;
}

export function BrandForm({ defaultValues, onSubmit, onSuccess, submitLabel }: BrandFormProps) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await onSubmit({
      name: name.trim(),
      description: description.trim() || undefined,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Something went wrong.");
      return;
    }

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div
          className="rounded-md px-3 py-2 text-xs"
          style={{ backgroundColor: "#FCEBEB", color: "#791F1F", border: "0.5px solid #F09595" }}
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Rolex"
          required
          maxLength={100}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Swiss luxury watchmaker, founded 1905."
          maxLength={500}
          rows={3}
        />
      </div>

      <Button
        type="submit"
        disabled={loading || !name.trim()}
        style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
      >
        {loading ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}