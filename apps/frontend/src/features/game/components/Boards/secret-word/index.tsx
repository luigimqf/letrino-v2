"use client";

import { ModeBoardProps } from "../types";
import { MatchPlaceholder } from "../shared/match-placeholder";

export function SecretWordBoard({ match }: ModeBoardProps) {
  return (
    <MatchPlaceholder
      match={match}
      accent="border-accent-100/40 bg-gradient-to-br from-accent-100/10 via-transparent to-primary-200/10"
    />
  );
}
