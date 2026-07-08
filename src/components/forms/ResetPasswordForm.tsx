import { useEffect, useState } from "react";import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthLayout from "@/components/auth/AuthLayout";

import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/validation/reset-password.schema";

import { authService } from "@/services/auth.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
 const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (
    data: ResetPasswordFormData
  ) => {
    try {
      setLoading(true);

      const response =
        await authService.resetPassword({
          email,
          otp: data.otp,
          newPassword: data.newPassword,
        });

      toast.success(response.message);

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (countdown <= 0) return;
  
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  
    return () => clearInterval(timer);
  }, [countdown]);


  const handleResendOtp = async () => {
    try {
      setResending(true);
  
      const response = await authService.forgotPassword({
        email,
      });
  
      toast.success(response.message);
  
      setCountdown(60);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to resend OTP"
      );
    } finally {
      setResending(false);
    }
  };


  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter the OTP and your new password."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <Label>Email</Label>

          <Input
            value={email}
            readOnly
          />
        </div>

        <div>
          <Label>OTP</Label>

          <Input
            placeholder="Enter OTP"
            maxLength={6}
            {...register("otp")}
          />

          {errors.otp && (
            <p className="text-sm text-red-500">
              {errors.otp.message}
            </p>
          )}
        </div>

        <div>
          <Label>New Password</Label>

          <Input
            type="password"
            placeholder="New password"
            {...register("newPassword")}
          />

          {errors.newPassword && (
            <p className="text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <Label>Confirm Password</Label>

          <Input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
  type="submit"
  className="w-full"
  disabled={loading}
>
  {loading ? "Resetting..." : "Reset Password"}
</Button>

<div className="text-center">
  {countdown > 0 ? (
    <p className="text-sm text-muted-foreground">
      Resend OTP in <strong>{countdown}s</strong>
    </p>
  ) : (
    <Button
      type="button"
      variant="outline"
      onClick={handleResendOtp}
      disabled={resending}
      className="w-full"
    >
      {resending ? "Sending..." : "Resend OTP"}
    </Button>
  )}
</div>
      </form>
    </AuthLayout>
  );
}