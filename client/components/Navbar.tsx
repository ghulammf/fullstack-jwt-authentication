"use client";

import authService from "@/services/auth.service";
import useAuthStore from "@/store/auth.store";
import { initTheme, toggleTheme } from "@/utils/theme";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useEffect, useState } from "react";

function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(initTheme());
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      router.push("/auth/login");
    }
  };

  const handleToggleTheme = () => {
    const newTheme = toggleTheme();
    setIsDark(newTheme);
  };

  const items: MenuItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => router.push("/dashboard"),
    },
    {
      label: "Products",
      icon: "pi pi-box",
      command: () => router.push("/dashboard"),
    },
  ];

  const end = (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{user?.username}</span>
      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"></span>
      <Button
        icon={isDark ? "pi pi-sun" : "pi pi-moon"}
        rounded
        text
        onClick={handleToggleTheme}
        tooltip={isDark ? "Light Mode" : "Dark Mode"}
        tooltipOptions={{ position: "bottom" }}
      ></Button>
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        severity="danger"
        onClick={handleLogout}
      ></Button>
    </div>
  );

  return <Menubar model={items} end={end} className="mb-4" />;
}

export default Navbar;
