export const validateGuess = (guess: string, target: string): boolean => {
  if (!guess || !target) {
    return false;
  }

  const guessLower = guess.toLowerCase();
  const targetLower = target.toLowerCase();

  return guessLower === targetLower;
}