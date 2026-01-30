import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";
import eslintConfigPrettier from "eslint-config-prettier";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Arquivos a serem processados
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  // Configurações do Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Configuração do TanStack Query
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@tanstack/query": pluginQuery,
    },
    rules: {
      "@tanstack/query/exhaustive-deps": "off",
    },
  },

  // Regras customizadas
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": "error",
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },

  // Prettier deve ser o último para sobrescrever regras conflitantes
  eslintConfigPrettier,
];

export default eslintConfig;
