export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_OTP: "/auth/resend-otp",
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    REFRESH_TOKEN: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
    GOOGLE: "/auth/google",
  },

  URL: {
    CREATE: "/url",
    GET_ALL: "/url",
    UPDATE: "/url",
    
    ANALYTICS: (id: string) => `/url/analytics/${id}`,
  },
} as const;