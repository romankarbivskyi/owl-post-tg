import { API } from "@/lib/axios.ts";
import { ApiResponse, User } from "@/types";

export const authUser = async (
  initData: string,
): Promise<ApiResponse<{ user: User; token: string }>> => {
  const res = await API.post("/users/auth", { initData });
  return { data: res.data, status: res.status };
};
