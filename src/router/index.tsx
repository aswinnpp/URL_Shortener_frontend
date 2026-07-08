import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import VerifyEmail from "@/pages/Auth/VerifyEmail";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
import Dashboard from "@/pages/Dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import DashboardLayout from "@/layouts/DashboardLayout";

import CreateUrl from "@/pages/Url/CreateUrl";
import MyUrls from "@/pages/Url/MyUrls";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/create",
        element: <CreateUrl />,
      },
      {
        path: "/dashboard/my-urls",
        element: <MyUrls />,
      },
      
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
]);