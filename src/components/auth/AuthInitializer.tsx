import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { authService } from "@/services/auth.service";
import {
  loginSuccess,
  logoutSuccess,
} from "@/redux/slices/authSlice";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      console.log("Initialize started");
  
      try {
        const response = await authService.refreshToken();
  
        console.log("Refresh success", response);
  
        dispatch(loginSuccess(response.user));
      } catch (error) {
        console.log("Refresh failed", error);
  
        dispatch(logoutSuccess());
      } finally {
        console.log("Setting ready");
  
        setReady(true);
      }
    };
  
    initialize();
  }, [dispatch]);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}