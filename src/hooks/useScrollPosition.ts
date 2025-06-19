import { useEffect, useState } from 'react';

type ScrollPosition = { x: number; y: number };

/**
 * Custom hook to track the current scroll position of the window.
 *
 * @returns {ScrollPosition} An object containing the current scroll position with properties `x` and `y`.
 *
 * @example
 * const { x, y } = useScrollPosition();
 */

export const useScrollPosition = (): ScrollPosition => {
  const [positions, setPositions] = useState<ScrollPosition>({
    x: window.scrollX,
    y: window.scrollY,
  });

  const handleScroll = () => {
    setPositions({ x: window.scrollX, y: window.scrollY });
  };

  useEffect(() => {
    handleScroll(); // Initialize positions on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return positions;
};
