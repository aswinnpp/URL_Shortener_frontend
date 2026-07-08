import {
  Home,
  Link2,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

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
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}