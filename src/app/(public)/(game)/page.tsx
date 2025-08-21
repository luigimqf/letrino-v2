import { GameEnd } from "@/features/game/components/GameEnd";
import { Grid } from "@/features/game/components/Grid";
import { Keyboard } from "@/features/game/components/Keyboard";
import { TargetWord } from "@/features/game/types/game";
import { ROUTES } from "@/shared/constants";
import { PromiseReturn } from "@/shared/types";
import { redirect } from "next/navigation";

export default async function GamePage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word`);

  if(!response.ok) redirect(ROUTES.WORD_NOT_FOUND);

  const {data: targetWord}: PromiseReturn<TargetWord> = await response.json();

  if (!targetWord) {
    redirect(ROUTES.WORD_NOT_FOUND);
  }

  return (
    <main className="w-full h-full flex flex-col py-15 justify-between items-center">
      <Grid targetWord={targetWord}/>
      <Keyboard />
      <GameEnd />
    </main>
  )
}