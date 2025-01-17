import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { TokenService } from "../services/token.service";
import { IUser, UserRole } from "../../core/models/user.model";

export const authMiddleware = (isAdminOnly: boolean = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.header("Authorization");
    const token: string | null = auth ? auth.split(" ")[1] : null;

    if (!token) {
      return next(ApiError.Unauthorized("No token provided"));
    }

    try {
      const tokenData = (await TokenService.validateToken(token)) as IUser;

      if (isAdminOnly && tokenData.role !== UserRole.ADMIN) {
        throw ApiError.Forbidden();
      }

      (req as any).user = tokenData;

      return next();
    } catch (err) {
      return next(ApiError.Unauthorized("Invalid token provided"));
    }
  };
};
