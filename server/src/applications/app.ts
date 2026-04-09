import express, { Request, Response } from "express";
import productRouter from "../routers/product.route";
import cors from "cors";
import { errorMiddleware } from "../middlewares/error.middleware";
import dotenv from "dotenv";
import authRouter from "../routers/auth.route";
import userRouter from "../routers/user.route";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT: number = Number(process.env.PORT) || 7000;

app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later!",
});
app.use(limiter);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(cookieParser());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(authRouter);
app.use(userRouter);
app.use(productRouter);

app.get("/", function (req: Request, res: Response) {
  res.json({ message: "hello from server" });
});

// health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// app.use("*", (req, res) => {
//   res.status(404).json({
//     error: "Route not found",
//   });
// });

app.use(errorMiddleware);

export { app, PORT };
