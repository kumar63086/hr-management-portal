import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import mongoose from "mongoose";
import { ZodError } from "zod";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 ERROR:", err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  // production
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ status: err.status, message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ status: "fail", message: "Validation failed", errors: err.issues });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ status: "fail", message: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ status: "fail", message: `${Object.keys(err.keyValue)} already exists` });
  }

  return res.status(500).json({ status: "error", message: "Something went wrong!" });
};

export default globalErrorHandler;
