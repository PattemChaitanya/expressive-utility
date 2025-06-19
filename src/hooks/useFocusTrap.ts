import { RefObject, useEffect } from 'react';

export const useFocusTrap = <T extends HTMLElement>(ref: RefObject<T>) => {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const focusableElements = [
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]',
    ];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusable = node.querySelectorAll(focusableElements.join(', '));
      if (focusable.length === 0) return;

      const focusableArray = Array.from(focusable) as HTMLElement[];
      const total = focusableArray.length;
      const currentIndex = focusableArray.indexOf(
        document.activeElement as HTMLElement,
      );

      if (event.shiftKey) {
        // Shift+Tab: move backwards
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : total - 1;
        focusableArray[prevIndex].focus();
        event.preventDefault();
      } else {
        // Tab: move forwards
        const nextIndex =
          currentIndex >= 0 && currentIndex < total - 1 ? currentIndex + 1 : 0;
        focusableArray[nextIndex].focus();
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref]);
};
