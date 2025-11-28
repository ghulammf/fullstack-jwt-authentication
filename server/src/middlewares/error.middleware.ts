import { NextFunction, Request, Response } from "express";

class ResponseError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

const errorMiddleware = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const err = error instanceof Error ? error : new Error(String(error));

  if (err instanceof ResponseError) {
    response.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
};

export { ResponseError, errorMiddleware };
