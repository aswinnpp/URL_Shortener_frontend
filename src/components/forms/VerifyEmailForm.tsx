import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  verifyEmailSchema,
  VerifyEmailFormData,
} from "@/validation/verify-email.schema";

import { authService } from "@/services/auth.service";

export default function VerifyEmailForm() {
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
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (
    data: VerifyEmailFormData
  ) => {
    try {
      setLoading(true);

      const response =
        await authService.verifyEmail({
          email,
          otp: data.otp,
        });

      toast.success(response.message);

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
        "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setResending(true);

      const response =
        await authService.resendOtp(email);

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


  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <AuthLayout
      title="Verify Email"
      subtitle={`OTP sent to ${email}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <Label>OTP</Label>

          <Input
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            {...register("otp")}
          />

          {errors.otp && (
            <p className="text-sm text-red-500">
              {errors.otp.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </Button>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </Button>

        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend OTP in{" "}
              <span className="font-semibold">
                00:{countdown.toString().padStart(2, "0")}
              </span>
            </p>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={resending}
              onClick={resendOtp}
            >
              {resending ? "Sending..." : "Resend OTP"}
            </Button>
          )}
        </div>
      </form>
    </AuthLayout>
  );
}