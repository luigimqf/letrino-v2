import { Logo } from "@/shared/components/layout/Logo";
import { ROUTES } from "@/shared/constants";
import Link from "next/link";

export default function WordNotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-bkg-100">
      <Logo />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Palavra não encontrada</h1>
        <p className="text-sm mb-6">
          Não foi possível encontrar a palavra do dia. Por favor, tente novamente mais tarde.
        </p>
        <Link href={ROUTES.HOME} className="text-blue-500 hover:underline">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}
