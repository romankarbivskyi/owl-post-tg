import { IUser, User } from "../models/user.model";
import { HydratedDocument } from "mongoose";

export class UserService {
  static createUser(data: Omit<IUser, "role">) {
    return User.create<Omit<IUser, "role">>(data);
  }

  static getUser(id: string) {
    return User.findOne<HydratedDocument<IUser>>({ tgId: id }).exec();
  }

  static getAllUsers() {
    return User.find({}).exec();
  }

  static async authUser(data: HydratedDocument<IUser>) {
    let user = await this.getUser(data.tgId);
    if (!user) {
      user = await this.createUser(data);
    }

    return user;
  }
}
