import IconConnect from "../components/Icons/conect";
import { IconHashtag } from "../components/Icons/ladder";
import IconSecretWord from "../components/Icons/secret-word";
import { IGamemode } from "../types";

export const GAMEMODES_DATA: Record<string, IGamemode> = {
  "secret-word": {
    slug: "secret-word",
    name: "Palavra Secreta",
    description: "Descubra a palavra do dia em até 6 tentativas.",
    accent: "from-accent-100/20 via-transparent to-primary-200/20",
    icon: IconSecretWord,
  },
  conect: {
    slug: "conect",
    name: "Conectado",
    description: "Agrupe as palavras pela conexão em comum.",
    accent: "from-warning/25 via-transparent to-accent-100/20",
    icon: IconConnect,
  },
  ladder: {
    slug: "ladder",
    name: "Cascata",
    description: "Suba a escada trocando uma letra de cada vez.",
    accent: "from-success/25 via-transparent to-accent-100/20",
    icon: IconHashtag,
  },
};
