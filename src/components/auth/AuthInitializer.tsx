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
      try {
        const response =
          await authService.refreshToken();

        dispatch(loginSuccess(response.user));
      } catch {
        dispatch(logoutSuccess());
      } finally {
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