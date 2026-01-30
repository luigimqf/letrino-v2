"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Countdown } from "@/shared/components/ui/timer";
import { RootState } from "@/shared/store";
import { Copy, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Attempt, ELetterStatus, MatchResult } from "../../types/game";

const STATUS_EMOJI: Record<ELetterStatus, string> = {
  correct: "🟩",
  incorrect: "🟥",
  warning: "🟨",
};

const getEmoji = (status?: ELetterStatus) => STATUS_EMOJI[status ?? ELetterStatus.INCORRECT];

const buildGameResult = (attempts: Attempt[]) =>
  attempts.map((att) => att.letters.map((letter) => getEmoji(letter.status)).join("")).join("\n");

const BonusCard = ({
  icon,
  title,
  value,
  delay,
}: {
  icon: string;
  title: string;
  value: number;
  delay: number;
}) => (
  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg shadow-sm animate-in slide-in-from-bottom-2 duration-500 hover:from-primary/10 hover:to-secondary/10 transition-colors">
    <div className="text-2xl animate-bounce" style={{ animationDelay: `${delay + 200}ms` }}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="text-lg font-bold text-primary">+{value}</p>
    </div>
  </div>
);

const ResultDisplay = ({ matchResult }: { matchResult: MatchResult | null }) => {
  return (
    <div className="mt-6 space-y-3">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-primary mb-1">🎉 Pontuação Conquistada!</h3>
      </div>

      {!matchResult ? (
        <div className="flex justify-center py-4">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : (
        (() => {
          const bonusItems = [
            {
              key: "attemptScore",
              icon: "🎉",
              title: "Número de Tentativas",
              value: matchResult.scoreDetails.attemptScore,
            },
            {
              key: "perfectGame",
              icon: "🎯",
              title: "Jogo Perfeito",
              value: matchResult.scoreDetails.perfectGame,
            },
            {
              key: "winStreak",
              icon: "🔥",
              title: "Sequência de Vitórias",
              value: matchResult.scoreDetails.winStreak,
            },
            {
              key: "highWinRate",
              icon: "⭐",
              title: "Alta Taxa de Vitória",
              value: matchResult.scoreDetails.highWinRate,
            },
            // { key: "goldenWord", icon: "👑", title: "Palavra Dourada", value: matchResult.bonuses.goldenWord },
          ].filter((item) => item.value > 0);

          if (bonusItems.length === 0) return null;

          return (
            <div className="space-y-2">
              {bonusItems.map((item, index) => (
                <BonusCard
                  key={item.key}
                  icon={item.icon}
                  title={item.title}
                  value={item.value}
                  delay={index * 150}
                />
              ))}
              {bonusItems.length > 1 ? (
                <BonusCard
                  icon="🏆"
                  title="Pontuação Total"
                  value={matchResult.totalScore}
                  delay={bonusItems.length * 150}
                />
              ) : null}
            </div>
          );
        })()
      )}
    </div>
  );
};

export const GameEnd = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { attempts, isGameOver, isWin, targetWord, matchResult } = useSelector(
    (state: RootState) => state.game,
  );

  const [shouldOpen, setShouldOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      setShouldOpen(true);
      return;
    }
    setShouldOpen(false);
  }, [isGameOver]);

  const copyResults = async () => {
    try {
      const resultStr = `🎉 Desafio Letrino vencido!\n\n${buildGameResult(
        attempts,
      )}\n\n🧠 Mostre que você também manda bem!\n\n▶️ Jogue agora em letrino.com.br`;
      await navigator.clipboard.writeText(resultStr);
      setCopied(true);
      toast.success("Resultados copiados para a área de transferência!");
      const timeout = setTimeout(() => setCopied(false), 1000);

      return () => clearTimeout(timeout);
    } catch {
      toast.error("Falha ao copiar resultados. Tente novamente.");
    }
  };

  return (
    <Dialog open={shouldOpen} onOpenChange={() => setShouldOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{isWin ? "Você ganhou" : "Você perdeu"}</DialogTitle>

          {!isWin && (
            <DialogDescription className="text-center">
              A palavra era:{" "}
              <span className="font-bold text-primary-100 text-lg">{targetWord?.word}</span>
            </DialogDescription>
          )}

          <div className="flex flex-col items-center mt-4">
            {attempts?.map((attempt, attemptIndex) => (
              <div key={`att-${attemptIndex}`} className="flex">
                {attempt?.letters?.map((letter, letterIndex) => (
                  <span key={`emoji-${letterIndex}`}>{getEmoji(letter.status)}</span>
                ))}
              </div>
            ))}
            <div
              data-copied={copied}
              className="transition-all duration-300 mt-4 flex items-center text-sm text-primary-300 gap-1 cursor-pointer select-none data-[copied='true']:text-primary-200"
              onClick={copied ? undefined : copyResults}
            >
              <Copy size={20} />
            </div>
          </div>

          {isWin && isAuthenticated && <ResultDisplay matchResult={matchResult} />}

          <div className="mt-6 flex flex-col items-center gap-1">
            <span className="text-muted-foreground">Próxima palavra em:</span>
            <Countdown />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
