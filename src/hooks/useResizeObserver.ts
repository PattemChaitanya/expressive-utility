import { RefObject, useEffect, useState } from 'react';

type Size = { width: number; height: number };

/**
 * Custom hook to observe the size of an element using ResizeObserver.
 *
 * @param ref - A React ref object pointing to the element to observe.
 * @returns The current size of the element or null if not available.
 */
export const useResizeObserver = <T extends HTMLElement>(
  ref: RefObject<T>,
): Size | null => {
  const [size, setSize] = useState<Size | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry && entry.contentRect) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return size;
};
