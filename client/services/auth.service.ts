import { apiClient } from "@/lib/axios";
import { LoginData, RegisterData } from "@/types/auth.type";

const authService = {
  register: async (data: RegisterData) => {
    const response = await apiClient.post("/api/auth/register", data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post("/api/auth/login", data);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/api/auth/logout", {});
    return response.data;
  },

  refreshToken: async () => {
    const response = await apiClient.post("/api/auth/refresh-token");
    return response.data;
  },
};

export default authService;
