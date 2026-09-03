"use client";

import { useModeMatch } from "@/features/game/hooks/useModeMatch";
import { EMatchAttemptResult, EMatchStatus, ModeMatch } from "@/features/game/types/game";
import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

const STATUS_LABEL: Record<EMatchStatus, string> = {
  [EMatchStatus.IN_PROGRESS]: "Em andamento",
  [EMatchStatus.CORRECT]: "Concluída — acertou",
  [EMatchStatus.INCORRECT]: "Concluída — errou",
};

interface IMatchPlaceholderProps {
  match: ModeMatch;
  /** Classes do modo: é aqui que cada tabuleiro põe a cara dele. */
  accent: string;
  children?: ReactNode;
}

const Row = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-border/60 py-1.5 last:border-b-0">
    <span className="text-tiny uppercase tracking-wide text-text-200 sm:text-xs">{label}</span>
    <span className="font-mono text-xs text-text-100 sm:text-sm">{value}</span>
  </div>
);

/**
 * Tabuleiro provisório: renderiza a partida que veio do backend e já hidratada
 * no store, sem disparar nenhuma requisição. Serve para validar o fluxo de
 * criação/busca de partida por modo antes dos tabuleiros reais existirem.
 */
export function MatchPlaceholder({ match: initial, accent, children }: IMatchPlaceholderProps) {
  const { match, isGameOver, attemptsLeft, errorsLeft, setDraft, confirm } = useModeMatch(initial);

  const registerLocalAttempt = () => {
    if (!match.draft.trim() || isGameOver) return;

    confirm({ input: match.draft.trim(), result: EMatchAttemptResult.INCORRECT });
  };

  return (
    <section
      className={cn(
        "w-full max-w-md rounded-2xl border border-border bg-bkg-200 p-5 shadow-sm",
        accent,
      )}
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <h1 className="font-fredoka text-lg font-bold text-foreground">{match.name}</h1>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-tiny font-medium sm:text-xs",
            isGameOver ? "bg-bkg-300 text-text-200" : "bg-success/15 text-success",
          )}
        >
          {STATUS_LABEL[match.status]}
        </span>
      </header>

      <div className="mb-4">
        <Row label="slug" value={match.slug} />
        <Row label="matchId" value={match.matchId.slice(0, 8)} />
        <Row label="dayKey" value={match.dayKey} />
        <Row label="score" value={match.score} />
        <Row label="maxAttempts" value={match.maxAttempts ?? "—"} />
        <Row label="maxErrors" value={match.maxErrors ?? "—"} />
        <Row label="restantes" value={attemptsLeft ?? errorsLeft ?? "—"} />
      </div>

      <div className="mb-4">
        <p className="mb-2 text-tiny uppercase tracking-wide text-text-200 sm:text-xs">
          Tentativas ({match.attempts.length})
        </p>
        {match.attempts.length === 0 ? (
          <p className="text-xs text-muted-foreground">Nenhuma tentativa registrada hoje.</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {match.attempts.map((attempt, index) => (
              <li
                key={`${attempt.input}-${index}`}
                className="flex items-center justify-between rounded-md bg-bkg-300/60 px-2.5 py-1.5 font-mono text-xs"
              >
                <span className="uppercase tracking-widest">{attempt.input}</span>
                <span
                  className={
                    attempt.result === EMatchAttemptResult.CORRECT
                      ? "text-success"
                      : "text-text-200"
                  }
                >
                  {attempt.result}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {children}

      <div className="mt-4 border-t border-border/60 pt-4">
        <p className="mb-2 text-tiny text-text-200 sm:text-xs">
          Rascunho no store (local, sem chamar o backend)
        </p>
        <div className="flex gap-2">
          <input
            value={match.draft}
            onChange={(event) => setDraft(event.target.value)}
            disabled={isGameOver}
            placeholder="digite uma jogada"
            className="min-w-0 flex-1 rounded-md border border-border bg-bkg-100 px-3 py-2 text-sm outline-none focus-visible:border-accent-100 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={registerLocalAttempt}
            disabled={isGameOver || !match.draft.trim()}
            className="rounded-md bg-accent-100 px-3 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-40"
          >
            Registrar
          </button>
        </div>
      </div>
    </section>
  );
}
