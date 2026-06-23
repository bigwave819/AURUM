// components/admin/watches/watch-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, Loader2, X } from "lucide-react";
import { watchSchema, type WatchFormValues, type WatchFormInput } from "@/lib/schemas/watch-schema";
import { uploadToCloudinary } from "@/lib/upload-to-cloudinary";

interface Brand {
  id: string;
  name: string;
}

interface WatchFormProps {
  brands: Brand[];
  defaultValues?: Partial<WatchFormValues>;
  onSubmit: (values: WatchFormValues) => Promise<{ success: boolean; error?: string }>;
  onSuccess: () => void;
  submitLabel: string;
}

export function WatchForm({ brands, defaultValues, onSubmit, onSuccess, submitLabel }: WatchFormProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(defaultValues?.image ?? null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WatchFormInput, any, WatchFormValues>({
    resolver: zodResolver(watchSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      brandId: defaultValues?.brandId ?? "",
      price: defaultValues?.price ?? undefined,
      description: defaultValues?.description ?? "",
      image: defaultValues?.image ?? "",
    },
  });

  const imageValue = watch("image");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setPreview(URL.createObjectURL(file)); // instant local preview, no waiting on network
    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setValue("image", url, { shouldValidate: true });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
      setPreview(defaultValues?.image ?? null);
    } finally {
      setUploading(false);
    }
  }

  function clearImage() {
    setPreview(null);
    setValue("image", "", { shouldValidate: true });
  }

  async function onFormSubmit(values: WatchFormValues) {
    setSubmitError(null);
    const result = await onSubmit(values);
    if (!result.success) {
      setSubmitError(result.error ?? "Something went wrong.");
      return;
    }
    onSuccess();
  }

  const busy = uploading || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
      {submitError && (
        <div
          className="rounded-md px-3 py-2 text-xs"
          style={{ backgroundColor: "#FCEBEB", color: "#791F1F", border: "0.5px solid #F09595" }}
        >
          {submitError}
        </div>
      )}

      {/* Image upload */}
      <div className="flex flex-col gap-1.5">
        <Label>Image</Label>
        <div className="flex items-center gap-4">
          <div
            className="relative w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden shrink-0"
            style={{ backgroundColor: "#F5EDE3", border: "0.5px solid #E0D5C8" }}
          >
            {preview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Watch preview" className="w-full h-full object-cover" />
                {uploading && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                  >
                    <Loader2 size={20} className="animate-spin text-white" />
                  </div>
                )}
                {!uploading && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    aria-label="Remove image"
                  >
                    <X size={12} className="text-white" />
                  </button>
                )}
              </>
            ) : (
              <ImagePlus size={22} style={{ color: "#B5A088" }} />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label
              htmlFor="image-upload"
              className="cursor-pointer text-xs font-medium rounded-md px-3 py-2 inline-flex items-center w-fit"
              style={{ backgroundColor: "#F5EDE3", color: "#745A27", border: "0.5px solid #D4B896" }}
            >
              {preview ? "Replace photo" : "Upload photo"}
            </Label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <p className="text-[11px]" style={{ color: "#9E9185" }}>
              JPG or PNG, up to 5MB
            </p>
          </div>
        </div>
        {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
        {errors.image && !uploadError && (
          <p className="text-xs text-red-600">{errors.image.message}</p>
        )}
        <input type="hidden" {...register("image")} value={imageValue} />
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Submariner Date" {...register("name")} />
        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
      </div>

      {/* Brand */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="brandId">Brand</Label>
        <Select
          onValueChange={(value) => setValue("brandId", value, { shouldValidate: true })}
          defaultValue={defaultValues?.brandId}
        >
          <SelectTrigger id="brandId">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.brandId && <p className="text-xs text-red-600">{errors.brandId.message}</p>}
      </div>

      {/* Price */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="price">Price (USD)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          placeholder="10250"
          {...register("price")}
        />
        {errors.price && <p className="text-xs text-red-600">{errors.price.message}</p>}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Iconic dive watch with date complication."
          rows={3}
          {...register("description")}
        />
        {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={busy}
        style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
      >
        {busy ? (uploading ? "Uploading…" : "Saving…") : submitLabel}
      </Button>
    </form>
  );
}