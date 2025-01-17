import { model, Model, Schema, Types } from "mongoose";

export interface IEmail {
  email: string;
  token: string;
  user: Types.ObjectId;
}

type EmailModel = Model<IEmail>;

const emailSchema = new Schema<IEmail, EmailModel>({
  email: { type: String, required: true },
  token: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Email = model<IEmail, EmailModel>("Email", emailSchema);
