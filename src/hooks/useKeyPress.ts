import { useEffect, useState } from 'react';

/**
 * Custom hook to handle key press events.
 * @param targetKey - The key to listen for (e.g., 'Enter', 'Escape').
 
  * @returns {boolean} - Returns true if the target key is currently pressed.
 */

type keyCombo = {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
};

export const useKeyPress = (targetKey: keyCombo): boolean => {
  const [isPressed, setIsPressed] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key.toLowerCase() === targetKey.key.toLowerCase() &&
      !!targetKey.ctrlKey === event.ctrlKey &&
      !!targetKey.shiftKey === event.shiftKey &&
      !!targetKey.altKey === event.altKey &&
      !!targetKey.metaKey === event.metaKey
    ) {
      setIsPressed(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (
      event.key.toLowerCase() === targetKey.key.toLowerCase() &&
      !!targetKey.ctrlKey === event.ctrlKey &&
      !!targetKey.shiftKey === event.shiftKey &&
      !!targetKey.altKey === event.altKey &&
      !!targetKey.metaKey === event.metaKey
    ) {
      setIsPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [targetKey]);

  return isPressed;
};
