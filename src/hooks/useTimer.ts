import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerOptions {
  duration?: number; // Total duration in ms (for countdown)
  interval?: number; // Update frequency in ms
  autoStart?: boolean; // Start automatically
  countDown?: boolean; // Count down instead of up
}

export function useTimer({
  duration = 0,
  interval = 1000,
  autoStart = true,
  countDown = false,
}: UseTimerOptions = {}) {
  const [time, setTime] = useState(countDown ? duration : 0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clear = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const tick = () => {
    setTime((prev) =>
      countDown ? Math.max(prev - interval, 0) : prev + interval,
    );
  };

  const start = useCallback(() => {
    if (!timerRef.current) {
      setIsRunning(true);
      timerRef.current = setInterval(tick, interval);
    }
  }, [interval]);

  const pause = useCallback(() => {
    clear();
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTime(countDown ? duration : 0);
    clear();
    if (autoStart) start();
    else setIsRunning(false);
  }, [countDown, duration, autoStart, start]);

  useEffect(() => {
    if (autoStart) start();
    return clear;
  }, [start, autoStart]);

  useEffect(() => {
    if (countDown && time === 0) pause();
  }, [time, countDown, pause]);

  return { time, isRunning, start, pause, reset };
}
