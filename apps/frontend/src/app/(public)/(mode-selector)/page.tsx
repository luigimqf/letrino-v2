import Mode from "@/features/modes/components/mode";
import { GAMEMODES_DATA } from "@/features/modes/constants";
import { IGamemode } from "@/features/modes/types";
import { ROUTES } from "@/shared/constants";
import { PromiseReturn } from "@/shared/types";
import { Gamepad2 } from "lucide-react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

// TODO: substituir pelas partidas do dia do usuário quando o endpoint existir.
const COMPLETED_MODES: string[] = [];

export default async function ModeSelectorPage() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gamemodes/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) redirect(ROUTES.WORD_NOT_FOUND);

    const { data: gamemodes }: PromiseReturn<IGamemode[]> = await response.json();

    if (!gamemodes || gamemodes.length <= 0) redirect(ROUTES.WORD_NOT_FOUND);

    const completedCount = gamemodes.filter((mode) => COMPLETED_MODES.includes(mode.slug)).length;
    const progress = gamemodes.length ? Math.round((completedCount / gamemodes.length) * 100) : 0;

    return (
      <main className="flex min-h-0 flex-1 overflow-auto px-4 pb-10 pt-16 sm:pt-6 lg:px-8 lg:pl-24">
        <div className="m-auto flex w-full max-w-4xl flex-col">
          <header className="mb-8 flex flex-col items-center text-center lg:mb-12">
            <div className="mb-3 flex items-center justify-center gap-3">
              <Gamepad2 className="h-8 w-8 text-primary lg:h-10 lg:w-10" aria-hidden />
              <h1 className="font-fredoka text-2xl font-bold text-foreground lg:text-3xl">
                Escolha um modo
              </h1>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Um desafio novo a cada dia. Escolha por onde começar.
            </p>

            <div className="mt-6 w-full max-w-xs">
              <div className="mb-2 flex items-center justify-between text-tiny text-text-200 sm:text-xs">
                <span>Progresso de hoje</span>
                <span className="font-medium text-text-100">
                  {completedCount} de {gamemodes.length}
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={gamemodes.length}
                aria-valuenow={completedCount}
                aria-label="Modos concluídos hoje"
                className="h-1.5 w-full overflow-hidden rounded-full bg-bkg-300"
              >
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full rounded-full bg-success transition-[width] duration-700 ease-out motion-reduce:transition-none"
                />
              </div>
            </div>
          </header>

          <section
            aria-label="Modos de jogo"
            className="grid grid-cols-[repeat(auto-fit,minmax(150px,220px))] justify-center gap-4 sm:gap-6"
          >
            {gamemodes.map((mode, index) => (
              <Mode
                key={mode.slug}
                index={index}
                Icon={GAMEMODES_DATA[mode?.slug].icon}
                slug={mode.slug}
                name={mode.name}
                completed={COMPLETED_MODES.includes(mode.slug)}
              />
            ))}
          </section>
        </div>
      </main>
    );
  } catch {
    redirect(ROUTES.WORD_NOT_FOUND);
  }
}
