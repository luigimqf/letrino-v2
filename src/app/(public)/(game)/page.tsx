import { Grid } from "@/features/game/components/Grid";
import { Keyboard } from "@/features/game/components/Keyboard";

export default function GamePage() {
  return (
    <main className="w-full h-full flex flex-col py-15 justify-between items-center">
      <Grid />
      <Keyboard />
    </main>
  )
}