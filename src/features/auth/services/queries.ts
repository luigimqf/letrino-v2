import { useQuery } from "@tanstack/react-query";
import { UserBasicData } from "../types";
import { PromiseReturn, PromiseSuccess } from "@/shared/types";

async function getUserData(): Promise<PromiseReturn<UserBasicData>> {
  try {
    const res = await fetch("/api/get-user-data", {
      method: "GET"
    });

    if(res.ok) {
      const data = await res.json();
      return data
    }

    return {
      success: false,
      error: "unable to get user data"
    };
  } catch (error) {
    return {
      success: false,
      error: "server error"
    };
  }
}

export const useUserData = () => {
  return useQuery({
  queryKey: ["user-data"],
  queryFn: getUserData,
})
}