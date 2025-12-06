import User from "@/types/user.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  updateAccessToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,

      setAuth: (token: string, user: User) => {
        set({ accessToken: token, user });
      },

      updateAccessToken: (token: string) => {
        set({ accessToken: token });
      },

      logout: () => {
        set({ accessToken: null, user: null });
      },

      isAuthenticated: () => {
        return !!get().accessToken;
      },

      isAdmin: () => {
        return get().user?.role === "admin";
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
