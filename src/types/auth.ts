export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
  }

  export interface RegisterResponse {
    message: string;
    email: string;
    verificationRequired: boolean;
  }
  
  export interface VerifyEmailRequest {
    email: string;
    otp: string;
  }
  export interface VerifyEmailResponse {
    message: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface ForgotPasswordRequest {
    email: string;
  }
  
  export interface ResetPasswordRequest {
    email: string;
    otp: string;
    newPassword: string;
  }
  
  export interface AuthResponse {
    user: User;
  }