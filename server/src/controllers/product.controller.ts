import e, { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.service";

class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.create(req.body);
      return res.status(201).json({
        status: "success",
        message: "Product created successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.getAll();
      return res.status(200).json({
        status: "success",
        message: "Products data retrieved successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.getItem(Number(req.params));
      return res.status(200).json({
        status: "success",
        message: "Product retrieved successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.update(Number(req.params), req.body);
      return res.status(201).json({
        status: "success",
        message: "Product updated successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ProductService.delete(Number(req.params));
      return res.status(201).json({
        status: "success",
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
