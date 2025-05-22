import { GameEnd } from "@/features/game/components/GameEnd";
import { Grid } from "@/features/game/components/Grid";
import { Keyboard } from "@/features/game/components/Keyboard";
import { TargetWord } from "@/features/game/types/game";
import { PromiseSuccess } from "@/shared/types";

export default async function GamePage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word`);

  if(!response.ok) return null;

  const {data: targetWord}: PromiseSuccess<TargetWord> = await response.json();

  return (
    <main className="w-full h-full flex flex-col py-15 justify-between items-center">
      <Grid targetWord={targetWord}/>
      <Keyboard />
      <GameEnd />
    </main>
  )
}