import { RefObject, useEffect, useState } from 'react';

export const useFocusVisible = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const handleKeyDown = () => {
      if (ref.current) {
        ref.current.addEventListener('focus', onfocus, true);
        ref.current.addEventListener('blur', onblur, true);
      }
    };

    const handleMouseDown = () => {
      if (ref.current) {
        ref.current.removeEventListener('focus', onfocus, true);
        setIsFocusVisible(false);
      }
    };

    const onfocus = () => {
      setIsFocusVisible(true);
    };

    const onblur = () => {
      setIsFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [ref]);

  return isFocusVisible;
};
