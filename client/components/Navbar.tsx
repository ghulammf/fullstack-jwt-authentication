"use client";

import useAuthStore from "@/store/auth.store";
import useThemeStore from "@/store/theme.store";
// import { initTheme, toggleTheme } from "@/utils/theme";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  // const [isDark, setIsDark] = useState(false);

  // useEffect(() => {
  //   setIsDark(initTheme());
  // }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      router.push("/auth/login");
    }
  };

  // const handleToggleTheme = () => {
  //   const newTheme = toggleTheme();
  //   setIsDark(newTheme);
  // };

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
    <div className="flex items-center gap-2 h-20 px-8">
      <span className="text-sm font-medium">{user?.username}</span>
      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
        {user?.role?.toUpperCase()}
      </span>
      <Button
        icon={isDarkMode ? "pi pi-sun" : "pi pi-moon"}
        rounded
        text
        onClick={toggleTheme}
        tooltip={isDarkMode ? "Light Mode" : "Dark Mode"}
        tooltipOptions={{ position: "bottom" }}
      />

      <Button
        label="Logout"
        icon="pi pi-sign-out"
        severity="danger"
        onClick={handleLogout}
        className="h-10"
      ></Button>
    </div>
  );

  return <Menubar model={items} end={end} className="mb-4" />;
}

export default Navbar;
