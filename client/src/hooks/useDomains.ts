import { useQuery } from "@tanstack/react-query";
import { getDomains } from "@/api/emails";

export const useDomains = () => {
  return useQuery({
    queryKey: ["domains"],
    queryFn: getDomains,
  });
};
