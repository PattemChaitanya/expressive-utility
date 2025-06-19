import { useEffect, useLayoutEffect } from 'react';

export function useIsomorphicEffect(effect: () => void, deps?: any[]) {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined'
    ? useLayoutEffect(effect, deps)
    : useEffect(effect, deps);
}
