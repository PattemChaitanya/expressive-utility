import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useQueryParam(
  key: string,
): [string | null, (value: string) => void] {
  const location = useLocation();
  const navigate = useNavigate();

  const getParam = useCallback(() => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(key);
  }, [key, location.search]);

  const setParam = useCallback(
    (value: string) => {
      const urlParams = new URLSearchParams(location.search);
      if (value === null) {
        urlParams.delete(key);
      } else {
        urlParams.set(key, value);
      }
      navigate({ search: urlParams.toString() }, { replace: true });
    },
    [key, location.pathname, location.search, navigate],
  );

  return [getParam(), setParam];
}
