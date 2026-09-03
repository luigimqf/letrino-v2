"use client";

import { GamemodeSlug } from "@/shared/constants/modes";
import { AppDispatch, RootState } from "@/shared/store";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  attemptConfirmed,
  attemptRejected,
  attemptsLeft,
  attemptSubmitted,
  draftChanged,
  errorsLeft,
  isMatchOver,
  MatchAttempt,
  matchHydrated,
  selectMatch,
  toMatchState,
} from "../store/matchSlice";
import { EMatchStatus, ModeMatch } from "../types/game";

export function useModeMatch(initial: ModeMatch) {
  const slug = initial.mode.slug as GamemodeSlug;
  const dispatch = useDispatch<AppDispatch>();
  const stored = useSelector((state: RootState) => selectMatch(state, slug));

  useEffect(() => {
    dispatch(matchHydrated({ slug, match: initial }));
  }, [dispatch, slug, initial]);

  const match = useMemo(() => stored ?? toMatchState(slug, initial), [stored, slug, initial]);

  const setDraft = useCallback(
    (draft: string) => dispatch(draftChanged({ slug, draft })),
    [dispatch, slug],
  );

  const submit = useCallback(() => dispatch(attemptSubmitted({ slug })), [dispatch, slug]);

  const confirm = useCallback(
    (attempt: MatchAttempt, status?: EMatchStatus, score?: number) =>
      dispatch(attemptConfirmed({ slug, attempt, status, score })),
    [dispatch, slug],
  );

  const reject = useCallback(
    (error: string) => dispatch(attemptRejected({ slug, error })),
    [dispatch, slug],
  );

  return {
    slug,
    match,
    isGameOver: isMatchOver(match),
    attemptsLeft: attemptsLeft(match),
    errorsLeft: errorsLeft(match),
    setDraft,
    submit,
    confirm,
    reject,
  };
}
