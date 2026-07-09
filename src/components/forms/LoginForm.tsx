import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema, LoginFormData } from "@/validation/auth.schema";
import { authService } from "@/services/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import GoogleAuthButton from "@/components/ui/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginForm() {
  
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const authenticate = useAuthenticate();
  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
  
      const response = await authService.login(data);
  
      authenticate(response);
  
      toast.success("Login successful.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <Label htmlFor="email">
            Email
          </Label>
  
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
  
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
  
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="password">
              Password
            </Label>
  
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
  
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
  
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
  
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Login"}
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
  
        {/* Google Login */}
        <GoogleAuthButton />
  
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}