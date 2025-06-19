import { useEffect, useState } from 'react';

export const useAnimationDelay = (
  delay: number = 200,
  active: boolean,
): boolean => {
  const [isAnimationDelayed, setIsAnimationDelayed] = useState<boolean>(false);

  useEffect(() => {
    let timer: number;
    if (active) {
      timer = window.setTimeout(() => {
        setIsAnimationDelayed(true);
      }, delay);
    } else {
      setIsAnimationDelayed(false);
    }
    return () => window.clearTimeout(timer);
  }, [active, delay]);

  return isAnimationDelayed;
};
