import { ComponentType } from "react";

export type GamemodeIcon = ComponentType<{ size?: number; className?: string }>;

export interface IGamemode {
  slug: string;
  name: string;
  description: string;
  accent: string;
  icon: GamemodeIcon;
}
