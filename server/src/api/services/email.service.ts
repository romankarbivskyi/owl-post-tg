import { API } from "../lib/axios";
import { UserService } from "../../core/services/user.service";
import { ApiError } from "../utils/api-error";
import { Email, IEmail } from "../../core/models/email.model";
import { HydratedDocument } from "mongoose";
import { Domain, Message } from "../types";
import { AxiosResponse } from "axios";

export class EmailService {
  static async createEmail(name: string, domain: string, userId: string) {
    const existUser = await UserService.getUser(userId);
    if (!existUser) {
      throw ApiError.NotFound("User not found");
    }

    const userEmailsLength = (await this.getEmails(existUser._id.toString()))
      .length;
    if (userEmailsLength == 25) {
      throw ApiError.BadRequest(
        "The limit is 25 mailboxes. To add more, delete unnecessary ones",
      );
    }

    const res = await API.post<
      Omit<IEmail, "user">,
      AxiosResponse<Omit<IEmail, "user">>
    >("/email/new", { name, domain });
    const { email, token } = res.data;

    if (!token) {
      throw ApiError.BadRequest("Email already exist");
    }

    await Email.create({
      email,
      token,
      user: existUser._id,
    });

    return res;
  }

  static async getMessages(email: string): Promise<Message[]> {
    if (email == "null") throw ApiError.NotFound("Email is incorrect");

    try {
      const res = await API.get<Message[], AxiosResponse<Message[]>>(
        `/email/${email}/messages`,
      );

      return res.data.reverse();
    } catch (err: any) {
      const statusCode = err.response.data.code;

      if (statusCode == 101) {
        const existEmail = await Email.findOne({ email }).exec();
        if (!existEmail) throw ApiError.NotFound("Email not found");

        const [name, domain] = existEmail.email.split("@");

        await API.post<
          Omit<IEmail, "user">,
          AxiosResponse<Omit<IEmail, "user">>
        >(`/email/new`, {
          name,
          domain,
          token: existEmail.token,
        });

        return this.getMessages(email);
      }

      throw new Error("Something went wrong");
    }
  }

  static async getDomains(): Promise<{ domains: Domain[] }> {
    const res = await API.get<
      { domains: Domain[] },
      AxiosResponse<{ domains: Domain[] }>
    >("/domains");
    return res.data;
  }

  static async deleteEmail(email: string, userId: string) {
    const existUser = await UserService.getUser(userId);
    if (!existUser) {
      throw ApiError.NotFound("User not found");
    }

    const existEmail = (await Email.findOne({
      email,
    })) as HydratedDocument<IEmail>;
    if (!existEmail) {
      throw ApiError.NotFound("Email not found");
    }

    if (existEmail.user._id.toString() != existUser._id.toString()) {
      throw ApiError.Forbidden();
    }

    const res = await API.delete(`/email/${email}`, {
      data: {
        token: existEmail.token,
      },
    } as any);
    if (res.status !== 200) throw new Error("Something went wrong");

    await Email.deleteOne({ email });
  }

  static getEmails(userId: string) {
    return Email.find<HydratedDocument<IEmail>[]>({ user: userId }).exec();
  }

  static async getMessage(id: string): Promise<Message> {
    const res = await API.get<Message, AxiosResponse<Message>>(
      `/message/${id}`,
    );
    return res.data;
  }
}
