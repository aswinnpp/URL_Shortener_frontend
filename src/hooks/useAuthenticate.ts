import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";

import { loginSuccess } from "@/redux/slices/authSlice";
import { AuthResponse } from "@/types/auth";

export function useAuthenticate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authenticate = (response: AuthResponse) => {
    dispatch(loginSuccess(response.user));

    navigate("/dashboard", {
      replace: true,
    });
  };

  return authenticate;
}