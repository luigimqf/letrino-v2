import { GamemodeSlug } from "@/shared/constants/modes";
import type { RootState } from "@/shared/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EMatchAttemptResult, EMatchStatus, ModeMatch } from "../types/game";

export type MatchAttempt = {
  input: string;
  result: EMatchAttemptResult;
};

export type MatchState = {
  matchId: string;
  slug: GamemodeSlug;
  name: string;
  status: EMatchStatus;
  score: number;
  dayKey: string;
  maxAttempts: number | null;
  maxErrors: number | null;
  attempts: MatchAttempt[];
  draft: string;
  pending: boolean;
  error: string | null;
};

export type MatchesState = {
  activeSlug: GamemodeSlug | null;
  bySlug: Partial<Record<GamemodeSlug, MatchState>>;
};

const INITIAL_MATCHES_STATE: MatchesState = {
  activeSlug: null,
  bySlug: {},
};

export const toMatchState = (slug: GamemodeSlug, match: ModeMatch): MatchState => ({
  matchId: match.matchId,
  slug,
  name: match.mode.name,
  status: match.status,
  score: match.score,
  dayKey: match.dayKey,
  maxAttempts: match.maxAttempts ?? null,
  maxErrors: match.maxErrors ?? null,
  attempts: match.attempts
    .filter((attempt) => !!attempt.userInput)
    .map((attempt) => ({ input: attempt.userInput as string, result: attempt.result })),
  draft: "",
  pending: false,
  error: null,
});

const matchSlice = createSlice({
  name: "match",
  initialState: INITIAL_MATCHES_STATE,
  reducers: {
    matchHydrated: (state, action: PayloadAction<{ slug: GamemodeSlug; match: ModeMatch }>) => {
      const { slug, match } = action.payload;
      const current = state.bySlug[slug];
      const next = toMatchState(slug, match);

      // Mesma partida: o servidor manda no que é dele, mas o que é local
      // (draft em digitação, tentativa em voo) sobrevive à re-hidratação.
      state.bySlug[slug] =
        current?.matchId === next.matchId
          ? { ...next, draft: current.draft, pending: current.pending, error: current.error }
          : next;

      state.activeSlug = slug;
    },

    draftChanged: (state, action: PayloadAction<{ slug: GamemodeSlug; draft: string }>) => {
      const match = state.bySlug[action.payload.slug];

      if (!match || match.status !== EMatchStatus.IN_PROGRESS) return;

      match.draft = action.payload.draft;
    },

    attemptSubmitted: (state, action: PayloadAction<{ slug: GamemodeSlug }>) => {
      const match = state.bySlug[action.payload.slug];

      if (!match) return;

      match.pending = true;
      match.error = null;
    },

    attemptConfirmed: (
      state,
      action: PayloadAction<{
        slug: GamemodeSlug;
        attempt: MatchAttempt;
        status?: EMatchStatus;
        score?: number;
      }>,
    ) => {
      const { slug, attempt, status, score } = action.payload;
      const match = state.bySlug[slug];

      if (!match) return;

      match.attempts.push(attempt);
      match.draft = "";
      match.pending = false;
      match.error = null;

      if (status !== undefined) match.status = status;
      if (score !== undefined) match.score = score;
    },

    attemptRejected: (state, action: PayloadAction<{ slug: GamemodeSlug; error: string }>) => {
      const match = state.bySlug[action.payload.slug];

      if (!match) return;

      match.pending = false;
      match.error = action.payload.error;
    },

    matchCleared: (state, action: PayloadAction<{ slug: GamemodeSlug }>) => {
      delete state.bySlug[action.payload.slug];

      if (state.activeSlug === action.payload.slug) {
        state.activeSlug = null;
      }
    },
  },
});

export const {
  matchHydrated,
  draftChanged,
  attemptSubmitted,
  attemptConfirmed,
  attemptRejected,
  matchCleared,
} = matchSlice.actions;

export const selectMatch = (state: RootState, slug: GamemodeSlug): MatchState | null =>
  state.match.bySlug[slug] ?? null;

export const selectActiveSlug = (state: RootState): GamemodeSlug | null => state.match.activeSlug;

// Derivações ficam como funções puras sobre o estado: o selector devolve
// referência estável e o componente não re-renderiza à toa.
export const isMatchOver = (match: MatchState | null): boolean =>
  !!match && match.status !== EMatchStatus.IN_PROGRESS;

export const attemptsLeft = (match: MatchState | null): number | null => {
  if (!match || match.maxAttempts === null) return null;

  return Math.max(match.maxAttempts - match.attempts.length, 0);
};

export const errorsLeft = (match: MatchState | null): number | null => {
  if (!match || match.maxErrors === null) return null;

  const errors = match.attempts.filter(
    (attempt) => attempt.result === EMatchAttemptResult.INCORRECT,
  ).length;

  return Math.max(match.maxErrors - errors, 0);
};

export default matchSlice.reducer;
