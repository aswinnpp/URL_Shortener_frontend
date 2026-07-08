import { z } from "zod";

export const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .trim()
    .min(1, "URL is required")
    .url("Please enter a valid URL"),
});

export type CreateUrlFormData = z.infer<
  typeof createUrlSchema
>;