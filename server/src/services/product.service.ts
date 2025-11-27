import prisma from "../applications/database";
import Product from "../types/product.type";

class ProductService {
  static async create(payload: Product): Promise<Product> {
    const data = await prisma.product.create({
      data: payload,
    });
    return data;
  }

  static async getAll(): Promise<Product[] | null> {
    const data = await prisma.product.findMany();
    return data;
  }

  static async getItem(id: number): Promise<Product | null> {
    const data = await prisma.product.findUnique({
      where: { id: id },
    });
    return data;
  }

  static async update(id: number, payload: Product): Promise<Product | null> {
    const data = await prisma.product.update({
      where: { id: id },
      data: payload,
    });
    return data;
  }

  static async delete(id: number) {
    await prisma.product.delete({
      where: { id: id },
    });
  }
}

export default ProductService;
