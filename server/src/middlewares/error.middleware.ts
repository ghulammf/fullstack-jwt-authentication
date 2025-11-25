import { NextFunction, Request, Response } from "express";

class ResponseError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

const errorMiddleware = async (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ResponseError) {
    response.status(error.status).json({
      message: error.message,
    });
  } else {
    response.status(500).json({
      message: error.message,
    });
  }
};

export { ResponseError, errorMiddleware };
