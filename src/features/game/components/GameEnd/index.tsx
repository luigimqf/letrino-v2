"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { RootState } from "@/shared/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Attempt, ELetterStatus } from "../../types/game"
import { Countdown } from "./Countdown"
import { Button } from "@/shared/components/ui/button"

const statusEmoji: Record<ELetterStatus, string> = {
  correct: '🟩',
  incorrect: '🟥',
  warning: '🟨',
}

const getEmoji = (status?: ELetterStatus) => statusEmoji[status ?? ELetterStatus.INCORRECT];

const buildGameResult = (attempts: Attempt[]) => {
  return attempts?.map(row =>
    row.map(letter => getEmoji(letter.status)).join("")
  ).join("\n");
};

export const GameEnd = () => {
  const {attempts,isGameOver,isWin, targetWord} = useSelector((state: RootState) => state.game);
  const [shouldOpen, setShouldOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if(isGameOver) {
      setShouldOpen(isGameOver)
    }
  },[isGameOver]);


  const copyResults = async () => {
    try {
      let resultStr = `🎉 Desafio Letrino vencido! \n \n${buildGameResult(attempts)}\n \n 🧠 Mostre que você também manda bem! \n\n▶️ Jogue agora em letrino.com.br`
      await navigator.clipboard.writeText(resultStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(`Failed to copy: ${error}`)
    }
  }

  return (
    <Dialog open={shouldOpen} onOpenChange={() => setShouldOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {isWin ? "Você ganhou" : "Você perdeu"}
          </DialogTitle>
          <DialogDescription
            data-visible={!isWin}
            className="data-[visible='true']:visible invisible text-center"
          >
            A palavra era: <span className="font-bold text-primary-100 text-lg">{targetWord?.word}</span>
          </DialogDescription>
          <div className="flex flex-col self-center">
            {
              attempts?.map((attempt,attemptIndex) => (
                <div key={`att-${attemptIndex}`} className="flex">
                  {
                    attempt.map((letter, letterIndex) => {
                      const letterEmoji = statusEmoji[letter.status ?? ELetterStatus.INCORRECT] 
                      return (
                        <span key={`emoji-${letterIndex}`}>{letterEmoji}</span>
                      )
                    })
                  }
                </div>
              ))
            }
          </div>
          <div className="mt-4 flex flex-col gap-0.5 items-center self-center">
            <span>Próxima palavra em:</span>
            <Countdown/>
          </div>
          <Button 
            variant={copied ? "secondary" : "outline"}
            onClick={copyResults} 
            className="mt-4 self-center cursor-pointer"
          >{copied ? "Copiado" : "Copiar resultado"}</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}