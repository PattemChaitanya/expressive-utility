import { useCallback } from 'react';

export function useEncodeURLString() {
  return useCallback((params: string | object): string => {
    if (typeof params === 'string') {
      return encodeURIComponent(params);
    }
    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    return queryString;
  }, []);
}
