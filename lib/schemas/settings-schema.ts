// lib/schemas/settings-schema.ts
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
});

export type ProfileValues = z.infer<typeof profileSchema>;