/**
 * Fonte única dos slugs de modo. Fica em `shared/constants` (sem import de
 * componente React) porque o middleware roda no Edge e não pode arrastar
 * ícones nem boards para o bundle.
 */
export const GAMEMODE_SLUGS = ["secret-word", "conect", "ladder"] as const;

export type GamemodeSlug = (typeof GAMEMODE_SLUGS)[number];

export const isGamemodeSlug = (value: string): value is GamemodeSlug =>
  GAMEMODE_SLUGS.includes(value as GamemodeSlug);

export const isGamemodePath = (path: string): boolean =>
  GAMEMODE_SLUGS.some((slug) => path === `/${slug}`);
