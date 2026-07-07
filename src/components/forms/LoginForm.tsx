import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema, LoginFormData } from "@/validation/auth.schema";
import { authService } from "@/services/auth.service";
import { loginSuccess } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      setLoading(true);

      const response =
        await authService.login(data);

      dispatch(loginSuccess(response.user));

      toast.success("Login successful");

      navigate("/dashboard");
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
    <Card className="mx-auto mt-24 max-w-md p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Login
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <Label>Email</Label>

          <Input
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
          <Label>Password</Label>

          <Input
            type="password"
            placeholder="Enter password"
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
      </form>
    </Card>
  );
}