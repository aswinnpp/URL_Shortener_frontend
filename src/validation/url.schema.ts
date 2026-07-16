import { z } from "zod";

export const createUrlSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  originalUrl: z
    .string()
    .trim()
    .min(1, "URL is required")
    .url("Please enter a valid URL"),
});

export type CreateUrlFormData = z.infer<
  typeof createUrlSchema
>;
