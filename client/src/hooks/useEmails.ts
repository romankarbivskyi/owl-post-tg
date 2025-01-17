import { useQuery } from "@tanstack/react-query";
import { getEmails } from "@/api/emails.ts";

export const useEmails = () => {
  return useQuery({
    queryKey: ["emails"],
    queryFn: getEmails,
  });
};
