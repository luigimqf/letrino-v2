"use client";
import { cn } from "@/shared/lib/utils";
import { motion } from "motion/react";
import React, { useMemo } from "react";

export const BackgroundBoxesHover = ({ className, ...rest }: { className?: string }) => {
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
    return rows.map((_, i) =>
      cols.map((_, j) => ({
        id: `${i}-${j}`,
        color: getRandomColor(),
        letter: getRandomLetter(),
      })),
    );
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
                whileHover={{
                  backgroundColor: boxesData[i][j].color,
                  transition: { duration: 0 },
                }}
                animate={{
                  transition: { duration: 2 },
                }}
                key={`col` + j}
                className="relative bg-neutral-800 h-8 w-16 border-t border-r border-slate-700 flex items-center justify-center group"
              >
                <span className="text-slate-300 text-md font-mono opacity-30 pointer-events-none group-hover:text-slate-900 group-hover:opacity-80 transition-colors">
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

export const Boxes = React.memo(BackgroundBoxesHover);
