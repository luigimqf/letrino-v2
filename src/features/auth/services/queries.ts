import { useQuery } from "@tanstack/react-query";
import { UserBasicData } from "../types";
import { PromiseReturn } from "@/shared/types";

async function getUserData() {
  try {
    const response = await fetch("/api/get-user-data", {
      method: "GET",
    });

    if (!response.ok) {
      return {
        success: false,
        error: {
          message: "unable to get user data",
          code: "USER_DATA_FAILED",
        },
      };
    }

    return response.json();
  } catch {
    return {
      success: false,
      error: {
        message: "server error",
        code: "SERVER_ERROR",
      },
    };
  }
}

export const useUserData = () => {
  return useQuery<PromiseReturn<UserBasicData>>({
    queryKey: ["user-data"],
    queryFn: getUserData,
    staleTime: Infinity,
  });
};
