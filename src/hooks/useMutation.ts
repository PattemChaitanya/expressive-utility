import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * @description A hook for handling mutations in React.
 *
 * @param mutationFn - The function to be called when the mutation is triggered.
 * @param options - The options for the mutation.
 * @returns An object containing the data, error, loading, mutate, and cancel functions.
 */

interface MutationResult<T, E = any> {
  data: T | null;
  error: E | null;
  loading: boolean;
  mutate: (variables?: any) => Promise<void>;
  cancel: () => void;
}

interface UseMutationOptions {
  retryCount?: number;
  retryDelay?: number; // in ms
  cancellable?: boolean;
}

export function useMutation<T = any, E = any>(
  mutationFn: (variables?: any, signal?: AbortSignal) => Promise<T>,
  options?: UseMutationOptions,
): MutationResult<T, E> {
  const {
    retryCount = 3,
    retryDelay = 1000,
    cancellable = true,
  } = options || {};
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);
  const retryAttempt = useRef(0);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const cancel = useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  const mutate = useCallback(
    async (variables?: any) => {
      controllerRef.current?.abort(); // cancel previous if any
      if (cancellable) controllerRef.current = new AbortController();

      setLoading(true);
      setError(null);
      retryAttempt.current = 0;

      while (retryAttempt.current <= retryCount) {
        try {
          const result = await mutationFn(
            variables,
            controllerRef.current?.signal,
          );
          setData(result);
          setLoading(false);
          return;
        } catch (err: any) {
          if (err.name === 'AbortError') {
            setLoading(false);
            return;
          }

          retryAttempt.current += 1;
          if (retryAttempt.current > retryCount) {
            setError(err as E);
            setLoading(false);
            return;
          }

          await delay(retryDelay);
        }
      }
    },
    [mutationFn, retryCount, retryDelay, cancellable],
  );

  useEffect(() => cancel, []);

  return { data, error, loading, mutate, cancel };
}
