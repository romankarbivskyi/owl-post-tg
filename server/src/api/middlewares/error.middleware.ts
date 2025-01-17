import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";

function isValidJson(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error:
        typeof err.message === "string" && isValidJson(err.message)
          ? JSON.parse(err.message)
          : err.message,
    });
  }

  console.error(err.message);
  return res.status(500).json({
    error:
      typeof err.message === "string" && isValidJson(err.message)
        ? JSON.parse(err.message)
        : "Внутрішня помилка",
  });
};
