import { create } from "zustand";
import { persist } from "zustand/middleware";
import User from "@/types/user.type";
import { LoginData } from "@/types/auth.type";
import authService from "@/services/auth.service";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;

  setAuth: (token: string, user: User) => void;
  updateAccessToken: (token: string) => void;
  login: (data: LoginData) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      isLoading: false,

      login: async (data: LoginData) => {
        set({ isLoading: true });

        try {
          const response = await authService.login(data);
          set({ user: response.user, accessToken: response.accessToken });
        } finally {
          set({ isLoading: false });
        }
      },

      setAuth: (token: string, user: User) => {
        set({ accessToken: token, user });
      },

      updateAccessToken: (token: string) => {
        set({ accessToken: token });
      },

      logout: async () => {
        set({ isLoading: true });

        await authService.logout();

        localStorage.removeItem("auth-storage");
        set({ accessToken: null, user: null, isLoading: false });

        if (typeof window !== undefined) {
          window.location.href = "/auth/login";
        }
      },

      isAuthenticated: () => !!get().accessToken,

      isAdmin: () => get().user?.role === "ADMIN",
    }),
    {
      name: "auth-storage",
      // getStorage: () => localStorage, // jelas untuk browser-only
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
