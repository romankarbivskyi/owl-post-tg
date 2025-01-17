import { Schema, Model, model } from "mongoose";

export enum UserRole {
  ADMIN = "Admin",
  CUSTOMER = "Customer",
}

export interface IUser {
  tgId: string;
  role: UserRole;
}

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>({
  tgId: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.CUSTOMER,
    required: true,
  },
});

export const User = model<IUser, UserModel>("User", userSchema);
