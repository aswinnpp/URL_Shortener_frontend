import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  registerSchema,
  RegisterFormData,
} from "@/validation/register.schema";
import GoogleAuthButton from "@/components/ui/GoogleAuthButton";

import { authService } from "@/services/auth.service";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      console.log("Register form submitted", data);

      const response = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success(response.message);

      navigate(
        `/verify-email?email=${encodeURIComponent(response.email)}`
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your account to continue"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <Label>Name</Label>
  
          <Input
            placeholder="Enter your name"
            {...register("name")}
          />
  
          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
  
        <div>
          <Label>Email</Label>
  
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
  
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
  
        <div>
          <Label>Password</Label>
  
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
  
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
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
          className="w-full"
          disabled={loading}
          type="submit"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </Button>
  
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
  
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
  
        {/* Google Register/Login */}
        <GoogleAuthButton />
  
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}