import {
  Home,
  Link2,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppDispatch } from "@/store/hooks";
import { logoutSuccess } from "@/redux/slices/authSlice";

import { authService } from "@/services/auth.service";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const menus = [
  {
    name: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },
  {
    name: "Create URL",
    icon: Link2,
    path: "/dashboard/create",
  },
  {
    name: "My URLs",
    icon: Link2,
    path: "/dashboard/my-urls",
  },
];

export default function AppSidebar() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const response = await authService.logout();

      dispatch(logoutSuccess());

      toast.success(response.message);

      navigate("/login", {
        replace: true,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Logout failed"
      );
    }
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          ShortLink
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          URL Shortener
        </p>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
          >
            {({ isActive }) => (
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start transition-all duration-200 ${
                  isActive
                    ? "shadow-md"
                    : "hover:bg-gray-100"
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            )}
          </NavLink>
        ))}
      </nav>

      <Separator />

      {/* Logout */}
      <div className="p-4">
        <Button
          variant="destructive"
          className="w-full justify-center"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}