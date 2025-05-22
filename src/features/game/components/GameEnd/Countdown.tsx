'use client';

import React, { useEffect, useState, memo } from 'react';

function getSecondsUntilMidnight(): number {
  const now = new Date();
  const nextMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return Math.floor((nextMidnight.getTime() - now.getTime()) / 1000);
}

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

const CountdownToUTCComponent = () => {
  const [secondsLeft, setSecondsLeft] = useState(getSecondsUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : getSecondsUntilMidnight()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="text-2xl font-mono">{formatTime(secondsLeft)}</div>;
};

export const Countdown = memo(CountdownToUTCComponent);
