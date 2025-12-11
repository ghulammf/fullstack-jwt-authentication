interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductInput {
  name: string;
  price: number;
  stock: number;
}

export type { Product, ProductInput };
