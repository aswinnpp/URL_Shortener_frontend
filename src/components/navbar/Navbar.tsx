import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { authService } from "@/services/auth.service";
import { logoutSuccess } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await authService.logout();

      dispatch(logoutSuccess());

      toast.success("Logged out");

      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex items-center justify-between border-b bg-white px-8 py-4">
      <h1 className="text-xl font-bold">
        URL Shortener
      </h1>

      <Button
        variant="destructive"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
}