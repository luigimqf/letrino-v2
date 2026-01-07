/* eslint-disable no-unused-vars */
export const GAME_NAME = "Letrino";

export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

export enum ROUTES {
  HOME = "/",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  CALLBACK_SIGN_IN = "/callback/sign-in",
  CALLBACK_SIGN_UP = "/callback/sign-up",
  FORGOT_PASSWORD = "/forgot-password",
  REFRESH_PASSWORD = "/refresh-password",
  REFRESH_TOKEN = "/refresh-token",
  USER_DATA = "/user-data",
  USER_STATISTIC = "/user-statistic",
  LEADERBOARD = "/leaderboard",
  TUTORIAL = "/tutorial",
  WORD_NOT_FOUND = "/word-not-found",
  SUBMIT_BUG = "/submit-bug",
}

export enum ErrorsByCode {
  INVALID_USERNAME = "Nome de usuário inválido",
  INVALID_CREDENTIALS = "Credenciais inválidas",
  REQUIRED_TOKEN = "Token é obrigatório",
  REQUIRED_EMAIL = "Email é obrigatório",
  REQUIRED_REFRESH_TOKEN = "Refresh token é obrigatório",
  REQUIRED_PASSWORD = "Senha é obrigatória",
  REQUIRED_USERNAME = "Nome de usuário é obrigatório",
  WORD_NOT_FOUND = "Palavra do dia não encontrada",
  USER_NOT_FOUND = "Usuário não encontrado",
  NOT_IMPLEMENTED = "Este recurso ainda não está implementado",
  NOT_FOUND = "Não encontrado",
  NO_TOKEN = "Nenhum token fornecido",
  FOUND_EMAIL = "Email já está em uso",
  FOUND_USERNAME = "Nome de usuário já está em uso",
  FORBIDDEN = "Proibido",
  UNAUTHORIZED = "Não autorizado",
  INVALID_TOKEN = "Token inválido",
  TOKEN_EXPIRED = "Token expirado",
  SERVER_ERROR = "Erro interno do servidor",
  INCORRECT_ATTEMPT = "A tentativa está incorreta",
  CORRECT_ATTEMPT = "A tentativa está correta",
  ALREADY_GOT_RIGHT = "Você já acertou a palavra do dia",
  ALREADY_FAILED = "Você já usou todas as tentativas",
  BAD_REQUEST = "Requisição inválida",
  CONFLICT = "Conflito",
  UPDATE_SCORE_FAILED = "Falha ao atualizar o score",
  CALCULATE_ATTEMPTS_FAILED = "Falha ao calcular tentativas",
  CREATE_USER_STATISTIC_FAILED = "Falha ao criar estatísticas do usuário",
  CALCULATE_NEW_SCORE_FAILED = "Falha ao calcular novo score",
  UNKNOWN_ERROR = "Erro desconhecido",
  REFRESH_PASSWORD_FAILED = "Falha ao redefinir a senha",
}
