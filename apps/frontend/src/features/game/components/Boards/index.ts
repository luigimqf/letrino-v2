import { GamemodeSlug } from "@/shared/constants/modes";
import { ComponentType } from "react";
import { ConectBoard } from "./conect";
import { LadderBoard } from "./ladder";
import { SecretWordBoard } from "./secret-word";
import { ModeBoardProps } from "./types";

/**
 * Hashmap slug -> tabuleiro. Fica importado por um server component de
 * propósito: o RSC só envia ao browser o chunk do board que renderizou.
 * Tipar como Record<GamemodeSlug, ...> faz o TS cobrar a entrada quando um
 * modo novo entrar em GAMEMODE_SLUGS.
 */
export const MODE_BOARDS: Record<GamemodeSlug, ComponentType<ModeBoardProps>> = {
  "secret-word": SecretWordBoard,
  conect: ConectBoard,
  ladder: LadderBoard,
};

export type { ModeBoardProps };
