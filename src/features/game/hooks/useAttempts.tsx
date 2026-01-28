import { AppDispatch, RootState } from "@/shared/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { LETTERS_PER_ATTEMPT } from "../constants";
import { useUserAttempts } from "../services/queries";
import { registerUserAttempt, setAttempts, validateAttempt } from "../store/gameSlice";
import { Attempt } from "../types/game";
import { allowedWords } from "../utils";

export const useAttempts = () => {
  const { attempts, currentAttemptIndex, targetWord, isGameOver } = useSelector(
    (state: RootState) => state.game,
  );
  const { data: userAttempts, isSuccess, isPending } = useUserAttempts();

  const dispatch = useDispatch<AppDispatch>();

  const handleAttemptSubmission = useCallback(
    (isLogged: boolean) => {
      const currentAttempt: Attempt = attempts?.[currentAttemptIndex];
      const guess = currentAttempt?.letters?.reduce((acc, curr) => acc + curr.letter, "");

      if (!guess || guess.length < LETTERS_PER_ATTEMPT || !targetWord?.word || isGameOver) {
        return false;
      }

      if (!allowedWords.includes(guess.toUpperCase())) {
        toast("Palavra inválida", {
          action: {
            label: "Fechar",
            onClick: () => {},
          },
          position: "top-right",
          duration: 3000,
        });
        return;
      }

      dispatch(validateAttempt(guess));

      if (isLogged) {
        dispatch(registerUserAttempt(guess));
      }

      return true;
    },
    [attempts, currentAttemptIndex, targetWord, isGameOver, dispatch],
  );

  const canSubmitAttempt = useCallback(() => {
    const currentAttempt = attempts?.[currentAttemptIndex];
    const guess = currentAttempt?.letters?.reduce((acc, curr) => acc + curr.letter, "");

    return !!(guess && guess.length === LETTERS_PER_ATTEMPT && targetWord?.word && !isGameOver);
  }, [attempts, currentAttemptIndex, targetWord, isGameOver]);

  useEffect(() => {
    if (isSuccess && userAttempts?.data) {
      const newAttempts: Attempt[] = userAttempts?.data?.map((attempt) => ({
        status: attempt.status,
        letters: attempt.userInput.split("").map((letter) => ({ letter, status: undefined })),
      }));

      if (!newAttempts) return;

      dispatch(setAttempts(newAttempts));
    }
  }, [userAttempts, isPending, isSuccess, dispatch]);

  return {
    handleAttemptSubmission,
    canSubmitAttempt,
    isPending,
  };
};
