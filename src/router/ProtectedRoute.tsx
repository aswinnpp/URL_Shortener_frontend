import { Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";

import { useAppSelector } from "@/store/hooks";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}