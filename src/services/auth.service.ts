// src/services/auth.service.ts

import axiosInstance from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import {
  AuthResponse,
  RegisterResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from "@/types/auth";

export const authService = {
  register: async (
    data: RegisterRequest
  ): Promise<RegisterResponse> => {
    const response =
      await axiosInstance.post<RegisterResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        data
      );
  
    return response.data;
  },
  verifyEmail: async (
    data: VerifyEmailRequest
  ): Promise<VerifyEmailResponse> => {
    const response =
      await axiosInstance.post<VerifyEmailResponse>(
        API_ENDPOINTS.AUTH.VERIFY_EMAIL,
        data
      );
  
    return response.data;
  },
  
  resendOtp: async (
    email: string
  ): Promise<{ message: string }> => {
    const response =
      await axiosInstance.post<{ message: string }>(
        API_ENDPOINTS.AUTH.RESEND_OTP,
        { email }
      );
  
    return response.data;
  },




  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
  
    return response.data;
  },

  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    const response =
      await axiosInstance.post<ForgotPasswordResponse>(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        data
      );
  
    return response.data;
  },

  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    const response =
      await axiosInstance.post<ResetPasswordResponse>(
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

  googleAuth: async (
    idToken: string
  ): Promise<AuthResponse> => {
    const response =
      await axiosInstance.post<AuthResponse>(
        API_ENDPOINTS.AUTH.GOOGLE,
        {
          idToken,
        }
      );
  
    return response.data;
  },
};