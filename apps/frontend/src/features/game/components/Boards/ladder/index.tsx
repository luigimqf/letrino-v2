"use client";

import { ModeBoardProps } from "../types";
import { MatchPlaceholder } from "../shared/match-placeholder";

export function LadderBoard({ match }: ModeBoardProps) {
  return (
    <MatchPlaceholder
      match={match}
      accent="border-success/40 bg-gradient-to-br from-success/10 via-transparent to-accent-100/10"
    />
  );
}
