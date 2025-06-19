import { useEffect, useRef } from 'react';

export function useTitle(title: string, restoreOnUnmount = true) {
  const originalTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      if (restoreOnUnmount) {
        document.title = originalTitle.current;
      }
    };
  }, [title, restoreOnUnmount]);
}
