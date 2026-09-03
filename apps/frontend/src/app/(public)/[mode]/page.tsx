import { MODE_BOARDS } from "@/features/game/components/Boards";
import { getModeMatch } from "@/features/modes/services/get-mode-match";
import { ROUTES } from "@/shared/constants";
import { GamemodeSlug, isGamemodeSlug } from "@/shared/constants/modes";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

type GameModePageProps = {
  params: Promise<{ mode: string }>;
};

export default async function GameModePage({ params }: GameModePageProps) {
  const { mode } = await params;

  if (!isGamemodeSlug(mode)) notFound();

  const Board = MODE_BOARDS[mode as GamemodeSlug];

  const match = await getModeMatch(mode);

  if (!match) redirect(ROUTES.WORD_NOT_FOUND); //TODO: criar rota especifica

  return (
    <main
      data-mode={mode}
      className="flex w-full flex-1 items-center justify-center overflow-auto px-4 py-10 lg:pl-24"
    >
      <Board match={match} />
    </main>
  );
}
