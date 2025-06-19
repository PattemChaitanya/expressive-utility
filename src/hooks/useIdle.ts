import { useEffect, useState, useCallback } from 'react';

type IdleCallback = (isIdle: boolean) => void;

export function useIdle(timeout: number = 300000, onChange?: IdleCallback) {
  const [isIdle, setIsIdle] = useState(false);

  const reset = useCallback(() => {
    setIsIdle(false);
    if (onChange) onChange(false);
  }, [onChange]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const onActivity = () => {
      if (isIdle) {
        setIsIdle(false);
        if (onChange) onChange(false);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsIdle(true);
        if (onChange) onChange(true);
      }, timeout);
    };

    window.addEventListener('mousemove', onActivity);
    window.addEventListener('keydown', onActivity);
    window.addEventListener('scroll', onActivity);
    window.addEventListener('touchstart', onActivity);

    timer = setTimeout(() => {
      setIsIdle(true);
      if (onChange) onChange(true);
    }, timeout);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('scroll', onActivity);
      window.removeEventListener('touchstart', onActivity);
    };
  }, [isIdle, onChange, timeout]);

  return isIdle;
}
