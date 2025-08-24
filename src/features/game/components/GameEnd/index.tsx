"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Countdown } from "@/shared/components/ui/timer";
import { RootState } from "@/shared/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Attempt, ELetterStatus } from "../../types/game";

const STATUS_EMOJI: Record<ELetterStatus, string> = {
  correct: "🟩",
  incorrect: "🟥",
  warning: "🟨",
};

const getEmoji = (status?: ELetterStatus) => STATUS_EMOJI[status ?? ELetterStatus.INCORRECT];

const buildGameResult = (attempts: Attempt[]) =>
  attempts.map((att) => att.letters.map((letter) => getEmoji(letter.status)).join("")).join("\n");

export const GameEnd = () => {
  const { attempts, isGameOver, isWin, targetWord } = useSelector((state: RootState) => state.game);

  const [shouldOpen, setShouldOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      setShouldOpen(true);
    }
  }, [isGameOver]);

  const copyResults = async () => {
    try {
      const resultStr = `🎉 Desafio Letrino vencido!\n\n${buildGameResult(
        attempts,
      )}\n\n🧠 Mostre que você também manda bem!\n\n▶️ Jogue agora em letrino.com.br`;
      await navigator.clipboard.writeText(resultStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
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
          </div>

          <div className="mt-6 flex flex-col items-center gap-1">
            <span>Próxima palavra em:</span>
            <Countdown />
          </div>

          <Button variant={copied ? "secondary" : "outline"} onClick={copyResults} className="mt-4">
            {copied ? "Copiado" : "Copiar resultado"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
