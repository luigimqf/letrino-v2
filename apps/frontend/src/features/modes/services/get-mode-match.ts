import { ModeMatch } from "@/features/game/types/game";
import { apiFetch } from "@/shared/lib/api";
import { PromiseReturn } from "@/shared/types";

export async function getModeMatch(slug: string): Promise<ModeMatch | null> {
  const response = await apiFetch(`/game/match/${slug}/today`);

  if (!response.ok) return null;

  const { data }: PromiseReturn<ModeMatch> = await response.json();

  return data ?? null;
}
