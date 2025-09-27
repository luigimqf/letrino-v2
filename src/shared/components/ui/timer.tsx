"use client";

import { MILLISECONDS_IN_SECOND, SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from "@/shared/constants";
import { memo, useEffect, useState } from "react";

function getSecondsUntilMidnight(): number {
  const now = new Date();
  const nextMidnight = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );
  return Math.floor((nextMidnight.getTime() - now.getTime()) / MILLISECONDS_IN_SECOND);
}

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / SECONDS_IN_HOUR)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % SECONDS_IN_MINUTE).toString().padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

const CountdownToUTCComponent = () => {
  const [secondsLeft, setSecondsLeft] = useState(getSecondsUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(getSecondsUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="text-2xl font-mono">{formatTime(secondsLeft)}</div>;
};

export const Countdown = memo(CountdownToUTCComponent);
