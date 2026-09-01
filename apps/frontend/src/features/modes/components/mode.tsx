import { cn } from "@/shared/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { GamemodeIcon } from "../types";

interface IModeProps {
  Icon: GamemodeIcon;
  name: string;
  slug: string;
  completed?: boolean;
  index?: number;
}

export default function Mode({ Icon, name, slug, completed = false, index = 0 }: IModeProps) {
  return (
    <Link
      href={`/${slug}`}
      aria-label={completed ? `${name} — concluído hoje` : `Jogar ${name}`}
      data-completed={completed}
      style={{ animationDelay: `${index * 90}ms` }}
      className={cn(
        "group relative flex min-h-[11.5rem] w-full flex-col sm:min-h-[13.5rem] items-center justify-center gap-3 overflow-hidden",
        "rounded-2xl border border-border bg-bkg-200 p-4 shadow-sm sm:p-5",
        "animate-in fade-in zoom-in-95 slide-in-from-bottom-4 fill-mode-backwards duration-500 ease-out",
        "transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "hover:-translate-y-1.5 hover:border-accent-100/70 hover:shadow-xl hover:shadow-black/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-100 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:translate-y-0 active:scale-[0.98]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:animate-none",
        completed && "border-success/80 hover:border-success",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
          completed
            ? "from-success/20 via-transparent to-success/10"
            : "from-accent-100/20 via-transparent to-primary-200/20",
        )}
      />

      {completed && (
        <span
          title="Concluído hoje"
          className={cn(
            "absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full",
            "bg-success text-white shadow-md ring-2 ring-bkg-200",
            "animate-in zoom-in spin-in-45 duration-500 motion-reduce:animate-none",
          )}
        >
          <Check size={16} strokeWidth={3} aria-hidden />
          <span className="sr-only">Concluído hoje</span>
        </span>
      )}

      <Icon
        size={72}
        className={cn(
          "h-14 w-14 rounded-2xl drop-shadow-md transition-transform duration-300 ease-out sm:h-[4.5rem] sm:w-[4.5rem]",
          "group-hover:-rotate-3 group-hover:scale-110 motion-reduce:transform-none",
        )}
      />

      <div className="z-10 flex flex-col items-center gap-1 text-center">
        <h2 className="font-fredoka text-sm font-semibold text-text-100 sm:text-base">{name}</h2>
      </div>

      <span
        className={cn(
          "z-10 flex items-center gap-1 text-tiny font-medium transition-colors sm:text-xs",
          completed ? "text-success" : "text-muted-foreground group-hover:text-foreground",
        )}
      >
        {completed ? "Jogar novamente" : "Jogar"}
        <ArrowRight
          size={14}
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
        />
      </span>
    </Link>
  );
}
