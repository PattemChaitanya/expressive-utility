import { useCallback } from 'react';

export function useDecodeURLString() {
  return useCallback((queryParams: string): Record<string, string> => {
    const urlParams = queryParams.split('?')
      ? queryParams.split('?')[1]
      : queryParams;
    const params = new URLSearchParams(urlParams);
    const result: Record<string, string> = {};

    for (const [key, value] of params.entries()) {
      result[key] = value;
    }

    return result;
  }, []);
}
