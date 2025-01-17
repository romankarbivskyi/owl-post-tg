import querystring from "querystring";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";
import { UserService } from "../../core/services/user.service";
import { IUser } from "../../core/models/user.model";
import { HydratedDocument } from "mongoose";
import { TokenService } from "../services/token.service";

export class UserController {
  static async authUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { initData } = req.body;

      if (!initData) {
        return next(ApiError.Unauthorized("Missing initData or initDataHash"));
      }

      const BOT_TOKEN = process.env.BOT_TOKEN;
      if (!BOT_TOKEN) {
        throw new Error("Bot token is not defined in environment variables");
      }

      const vals = querystring.parse(initData);
      const dataCheckString = Object.keys(vals)
        .filter((key) => key !== "hash")
        .sort()
        .map((key) => `${key}=${decodeURIComponent(vals[key] as any)}`)
        .join("\n");

      const secretKey = crypto
        .createHmac("sha256", "WebAppData")
        .update(BOT_TOKEN)
        .digest();

      const hmac = crypto
        .createHmac("sha256", secretKey)
        .update(dataCheckString)
        .digest("hex");

      if (hmac == vals.hash) {
        if (!("user" in vals)) throw new Error("User not exist in initData");
        const userInitData = JSON.parse(vals.user as string);

        const user = await UserService.authUser({
          tgId: userInitData.id,
        } as HydratedDocument<IUser>);

        const token = await TokenService.generateToken(user);

        res.status(200).json({ user, token });
      } else {
        throw ApiError.Unauthorized("initData not found");
      }
    } catch (err) {
      next(err);
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.getAllUsers();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
