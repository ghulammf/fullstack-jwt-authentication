import express, { Request, Response } from "express";
import productRouter from "../routers/product.route";
import cors from "cors";
import { errorMiddleware } from "../middlewares/error.middleware";
import dotenv from "dotenv";
import authRouter from "../routers/auth.route";

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
app.use(authRouter);
app.use(productRouter);

app.get("/", function (req: Request, res: Response) {
  res.json({ message: "hello from server" });
});

app.use(errorMiddleware);

export { app, PORT };
