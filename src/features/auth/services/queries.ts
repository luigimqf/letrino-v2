import { PromiseReturn } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { Statistics, UserBasicData } from "../types";

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

async function getUserStatistics() {
  try {
    const response = await fetch("/api/get-user-statistic", {
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

export const useUserStatistics = () => {
  return useQuery<PromiseReturn<Statistics>>({
    queryKey: ["user-statistics"],
    queryFn: getUserStatistics,
    staleTime: Infinity,
  });
};
