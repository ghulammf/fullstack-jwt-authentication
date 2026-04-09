import { apiClient } from "@/lib/axios";
import { ProductInput } from "@/types/product.type";

const productService = {
  create: async (data: ProductInput) => {
    const response = await apiClient.post("/api/products", data);
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get("/api/products");
    return response.data;
  },

  getItem: async (id: number) => {
    const response = await apiClient.get("/api/products" + id);
    return response.data;
  },

  update: async (id: number, data: ProductInput) => {
    const response = await apiClient.put(`/api/products/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/api/products/${id}`);
    return response.data;
  },
};

export default productService;
