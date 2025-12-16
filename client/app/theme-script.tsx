"use client";

import { useEffect, useState } from "react";
import useThemeStore from "@/store/theme.store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Mencegah hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const html = document.querySelector("html");
    const linkId = "primereact-theme-link";
    let linkElement = document.getElementById(linkId) as HTMLLinkElement;

    // 1. Setup Tailwind Dark Mode (Class Strategy)
    if (isDarkMode) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }

    // 2. Setup PrimeReact Theme Switching
    // Kita meload CSS secara dinamis dari CDN atau public folder
    // Menggunakan tema Lara: Light Blue / Dark Blue
    const theme = isDarkMode ? "lara-dark-blue" : "lara-light-blue";
    const themeUrl = `https://unpkg.com/primereact/resources/themes/${theme}/theme.css`;

    if (!linkElement) {
      linkElement = document.createElement("link");
      linkElement.id = linkId;
      linkElement.rel = "stylesheet";
      document.head.appendChild(linkElement);
    }

    linkElement.href = themeUrl;
  }, [isDarkMode, mounted]);

  // Render dummy sampai client siap (opsional, untuk menghindari flash of wrong theme)
  if (!mounted) return <div className="invisible">{children}</div>;

  return <>{children}</>;
}
