import { Router } from "express";
import ProductController from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/api/products", ProductController.create);
productRouter.get("/api/products/", ProductController.getAll);
productRouter.get("/api/products/:id", ProductController.getItem);
productRouter.put("/api/products/:id", ProductController.update);
productRouter.delete("/api/products/:id", ProductController.delete);

export default productRouter;
