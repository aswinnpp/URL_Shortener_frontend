// src/services/auth.service.ts

import axiosInstance from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "@/types/auth";

export const authService = {
  register: async (data: RegisterRequest) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    return response.data;
  },

  verifyEmail: async (data: VerifyEmailRequest) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      data
    );

    return response.data;
  },

  resendOtp: async (email: string) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.RESEND_OTP,
      { email }
    );

    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );

    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    );

    return response.data;
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    );

    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGOUT
    );

    return response.data;
  },

  refreshToken: async () => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN
    );

    return response.data;
  },
};