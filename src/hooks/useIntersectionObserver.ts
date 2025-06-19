import { useEffect, useState, RefObject } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean; // option to stop observing once visible
}

export function useIntersectionObserver(
  ref: RefObject<Element>,
  {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    freezeOnceVisible = false,
  }: Args = {},
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || (freezeOnceVisible && entry?.isIntersecting)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref, root, rootMargin, threshold, freezeOnceVisible, entry]);

  return entry;
}
