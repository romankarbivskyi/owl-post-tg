import { useQuery } from "@tanstack/react-query";
import { getMessage } from "@/api/emails.ts";

export const useMessage = (messageId?: string) => {
  return useQuery({
    queryKey: ["message", messageId],
    queryFn: async () => {
      if (!messageId) return {};
      return getMessage(messageId);
    },
  });
};
