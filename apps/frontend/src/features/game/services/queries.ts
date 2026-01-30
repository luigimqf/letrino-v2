import { PromiseReturn } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { AuthenticatedAttempt, TargetWord } from "../types/game";

async function getWord() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch word");
    }

    return response.json();
  } catch {
    throw new Error("Failed to fetch word");
  }
}

async function getUserAttempts() {
  try {
    const response = await fetch("/api/user-attempts", {
      method: "GET",
    });

    if (!response.ok) {
      return {
        success: false,
        error: "error fetching user attempts",
      };
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export const useWordQuery = () => {
  return useQuery<PromiseReturn<TargetWord>>({
    queryKey: ["word"],
    queryFn: getWord,
    refetchOnWindowFocus: false,
  });
};

export const useUserAttempts = () => {
  return useQuery<PromiseReturn<AuthenticatedAttempt>>({
    queryKey: ["attempts"],
    queryFn: getUserAttempts,
    refetchOnWindowFocus: false,
  });
};
