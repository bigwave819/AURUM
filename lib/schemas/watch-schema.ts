// lib/schemas/watch-schema.ts
import { z } from "zod";

export const watchSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  brandId: z.string().min(1, "Brand is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  description: z.string().max(1000).optional(),
  image: z.string().url("Upload an image first"),
});

export type WatchFormInput = z.input<typeof watchSchema>;

export type WatchFormValues = z.infer<typeof watchSchema>;