import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    otp: z
      .string()
      .trim()
      .length(6, "OTP must be 6 digits"),

    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm your password"),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type ResetPasswordFormData =
  z.infer<typeof resetPasswordSchema>;