import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/api/emails";

export const useMessages = (email: string | null) => {
  return useQuery({
    queryKey: ["messages", email],
    queryFn: () => {
      if (!email) return [];
      return getMessages(email);
    },
    refetchInterval: 5000,
  });
};
