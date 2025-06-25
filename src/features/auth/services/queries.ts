import { useQuery } from "@tanstack/react-query";
import { UserBasicData } from "../types";
import { PromiseReturn } from "@/shared/types";

async function getUserData(): Promise<PromiseReturn<UserBasicData>> {
  try {
    const response = await fetch("/api/get-user-data", {
      method: "GET"
    });

    if(!response.ok) {
      return {
        success: false,
        error: "unable to get user data"
      };
    }

    return response.json()
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
  staleTime: Infinity
})
}