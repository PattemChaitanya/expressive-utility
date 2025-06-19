import { useState, useEffect, useRef } from 'react';

export const useThrottle = (value: any, delay: number) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();

    if (now - lastTime.current >= delay) {
      setThrottledValue(value);
      lastTime.current = now;
    } else {
      const timerHandle = setTimeout(
        () => {
          setThrottledValue(value);
          lastTime.current = now;
        },
        delay - (now - lastTime.current),
      );

      return () => clearTimeout(timerHandle);
    }
  }, [value, delay]);

  return throttledValue;
};
