import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",

      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";

          if (typeof document !== "undefined") {
            document.documentElement.classList.remove(state.theme);
            document.documentElement.classList.add(newTheme);
          }

          return { theme: newTheme };
        });
      },

      setTheme: (theme: Theme) => {
        set({ theme });

        if (typeof document !== "undefined") {
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(theme);
        }
      },
    }),
    {
      name: "theme-storage",
    }
  )
);

export default useThemeStore;
