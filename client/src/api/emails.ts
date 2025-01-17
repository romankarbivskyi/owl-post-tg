import { API } from "@/lib/axios.ts";
import { Domain, Email, Message, NewEmail } from "@/types";
import axios, { AxiosResponse } from "axios";

export const createEmail = async (
  name: string | null,
  domain: string | null,
): Promise<NewEmail | { error: string }> => {
  try {
    const res: AxiosResponse<NewEmail> = await API.post("/emails", {
      name,
      domain,
    });

    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const res = err.response;
      if (res && res.data) {
        return res.data as { error: string };
      }
    }
    return { error: "Unknown error" };
  }
};

export const deleteEmail = async (email: string): Promise<void> => {
  await API.delete(`/emails/${email}`);
};

export const getMessages = async (email: string): Promise<Message[]> => {
  const res = await API.get<Message[], AxiosResponse<Message[]>>(
    `/emails/${email}/messages`,
  );
  return res.data;
};

export const getDomains = async (): Promise<Domain[]> => {
  const res = await API.get<Domain[], AxiosResponse<Domain[]>>(
    "/emails/domains",
  );
  return res.data;
};

export const getEmails = async (): Promise<Email[]> => {
  const res = await API.get<Email[], AxiosResponse<Email[]>>(`/emails`);
  return res.data;
};

export const getMessage = async (messageId: string): Promise<Message> => {
  const res = await API.get<Message, AxiosResponse<Message>>(
    `/emails/message/${messageId}`,
  );
  console.log(res.data, "message data");
  return res.data;
};
