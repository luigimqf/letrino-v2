"use client";
import { cn } from "@/shared/lib/utils";
import { motion } from "motion/react";
import React, { useMemo } from "react";

export const BackgroundBoxes = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  const colors = ["var(--success)", "var(--destructive)", "var(--warning)"];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const boxesData = useMemo(() => {
    const totalBoxes = rows.length * cols.length;
    const coloredBoxesCount = Math.floor(totalBoxes * 0.1);
    const minDistance = 6;

    const grid = rows.map((_, i) =>
      cols.map((_, j) => ({
        id: `${i}-${j}`,
        color: undefined as string | undefined,
        letter: getRandomLetter(),
        isColored: false,
        row: i,
        col: j,
      })),
    );

    const calculateDistance = (
      pos1: { row: number; col: number },
      pos2: { row: number; col: number },
    ) => {
      return Math.sqrt(Math.pow(pos1.row - pos2.row, 2) + Math.pow(pos1.col - pos2.col, 2));
    };

    const isTooClose = (
      row: number,
      col: number,
      coloredPositions: { row: number; col: number }[],
    ) => {
      return coloredPositions.some((pos) => {
        const distance = calculateDistance({ row, col }, pos);
        return distance < minDistance;
      });
    };

    const coloredPositions: { row: number; col: number }[] = [];
    let attempts = 0;
    const maxAttempts = totalBoxes * 2;

    while (coloredPositions.length < coloredBoxesCount && attempts < maxAttempts) {
      const randomRow = Math.floor(Math.random() * rows.length);
      const randomCol = Math.floor(Math.random() * cols.length);

      if (!isTooClose(randomRow, randomCol, coloredPositions)) {
        coloredPositions.push({ row: randomRow, col: randomCol });
        grid[randomRow][randomCol].isColored = true;
        grid[randomRow][randomCol].color = getRandomColor();
      }

      attempts++;
    }

    if (coloredPositions.length < coloredBoxesCount) {
      const remainingCount = coloredBoxesCount - coloredPositions.length;
      let addedCount = 0;

      for (let i = 0; i < rows.length && addedCount < remainingCount; i++) {
        for (let j = 0; j < cols.length && addedCount < remainingCount; j++) {
          if (!grid[i][j].isColored) {
            const tooCloseRelaxed = coloredPositions.some((pos) => {
              const distance = calculateDistance({ row: i, col: j }, pos);
              return distance < minDistance * 0.7;
            });

            if (!tooCloseRelaxed) {
              grid[i][j].isColored = true;
              grid[i][j].color = getRandomColor();
              coloredPositions.push({ row: i, col: j });
              addedCount++;
            }
          }
        }
      }
    }

    return grid;
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden opacity-60", className)} {...rest}>
      <div
        style={{
          transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
        }}
        className="absolute z-0 flex h-[200vh] w-[200vw]"
      >
        {rows.map((_, i) => (
          <motion.div key={`row` + i} className="relative h-8 w-16 border-l border-slate-700">
            {cols.map((_, j) => (
              <motion.div
                key={`col` + j}
                className={cn(
                  "relative h-8 w-16 border-t border-r border-slate-700 flex items-center justify-center group transition-all duration-300",
                  boxesData[i][j].isColored ? "opacity-90" : "bg-neutral-800",
                )}
                style={{
                  backgroundColor: boxesData[i][j].isColored ? boxesData[i][j].color : undefined,
                }}
              >
                <span
                  className={cn(
                    "text-md font-mono pointer-events-none transition-colors",
                    boxesData[i][j].isColored
                      ? "text-slate-900 opacity-80 font-semibold"
                      : "text-slate-300 opacity-30",
                  )}
                >
                  {boxesData[i][j].letter}
                </span>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const Boxes = React.memo(BackgroundBoxes);
