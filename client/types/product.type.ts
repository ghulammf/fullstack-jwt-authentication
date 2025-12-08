interface ProductResponse {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductRequset {
  name: string;
  price: number;
  stock: number;
}

export type { ProductRequset, ProductResponse };
