import jwt from "jsonwebtoken";
import { IUser } from "../../core/models/user.model";
import { HydratedDocument } from "mongoose";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "secret";

export class TokenService {
  static async generateToken({ _id, tgId, role }: HydratedDocument<IUser>) {
    return jwt.sign(
      {
        _id: _id.toString(),
        tgId,
        role,
      },
      JWT_ACCESS_SECRET as string,
      {
        expiresIn: "1h",
      },
    );
  }

  static async validateToken(token: string) {
    return jwt.verify(token, JWT_ACCESS_SECRET as string);
  }
}
