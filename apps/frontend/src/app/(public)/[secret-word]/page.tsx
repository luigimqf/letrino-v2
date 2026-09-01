import { Grid } from "@/features/game/components/Grid";
import { Keyboard } from "@/features/game/components/Keyboard";
import { TargetWord } from "@/features/game/types/game";
import { ROUTES } from "@/shared/constants";
import { PromiseReturn } from "@/shared/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default async function GamePage() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) redirect(ROUTES.WORD_NOT_FOUND);

    const { data: targetWord }: PromiseReturn<TargetWord> = await response.json();

    if (!targetWord) {
      redirect(ROUTES.WORD_NOT_FOUND);
    }

    return (
      <main className="w-full h-full flex flex-col py-15 justify-between items-center">
        <Grid targetWord={targetWord} />
        <Keyboard />
      </main>
    );
  } catch {
    redirect(ROUTES.WORD_NOT_FOUND);
  }
}
