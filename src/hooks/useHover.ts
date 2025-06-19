import { RefObject, useEffect, useRef, useState } from 'react';

export const useHover = <T extends HTMLElement>(): {
  ref: RefObject<T>;
  isHovered: boolean;
} => {
  const ref = useRef<T>(null) as RefObject<T>;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    node.addEventListener('mouseenter', onEnter);
    node.addEventListener('mouseleave', onLeave);

    return () => {
      node.removeEventListener('mouseenter', onEnter);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, [ref]);

  return { ref, isHovered };
};
