import express from "express";
import productRouter from "../routers/product.route";
import cors from "cors";
import { errorMiddleware } from "../middlewares/error.middleware";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: true,
    // credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(productRouter);

app.use(errorMiddleware);

export { app, PORT };
