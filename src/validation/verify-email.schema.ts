import { z } from "zod";

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits"),
});

export type VerifyEmailFormData =
  z.infer<typeof verifyEmailSchema>;