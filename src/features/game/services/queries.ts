import { PromiseReturn } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { TargetWord } from "../types/game";

async function getWord() {
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
}

export const useWordQuery = () => {
  return useQuery<PromiseReturn<TargetWord>>({
    queryKey: ["word"],
    queryFn: getWord,
    refetchOnWindowFocus: false,
  });
};
