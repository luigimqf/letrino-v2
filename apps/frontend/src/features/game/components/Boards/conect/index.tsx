"use client";

import { ModeBoardProps } from "../types";
import { MatchPlaceholder } from "../shared/match-placeholder";

export function ConectBoard({ match }: ModeBoardProps) {
  return (
    <MatchPlaceholder
      match={match}
      accent="border-warning/40 bg-gradient-to-br from-warning/10 via-transparent to-accent-100/10"
    />
  );
}
