import {
  DependencyList,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';

interface FetchOptions extends RequestInit {}

interface UseFetchResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
}

// Cache and control maps
const cache = new Map<string, { timestamp: number; data: any }>();
const pendingRequests = new Map<string, Promise<any>>();

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
const DEFAULT_RETRY_COUNT = 3;
const RETRY_DELAY = (attempt: number) => 2 ** attempt * 100; // Exponential backoff

export function useFetch<T = unknown>(
  url: string,
  options?: FetchOptions,
  dependencies: DependencyList = [],
  config?: {
    useCache?: boolean;
    cacheTTL?: number;
    retryCount?: number;
  },
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const {
    useCache = true,
    cacheTTL = DEFAULT_TTL,
    retryCount = DEFAULT_RETRY_COUNT,
  } = config || {};

  const cacheKey = `${url}:${JSON.stringify(options)}`;

  const isCacheValid = (entry: { timestamp: number }) =>
    Date.now() - entry.timestamp < cacheTTL;

  const retryFetch = async (attempt = 0): Promise<T> => {
    try {
      const response = await fetch(url, {
        ...options,
        signal: controllerRef.current?.signal,
      });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    } catch (err) {
      if (attempt < retryCount && (err as Error).name !== 'AbortError') {
        await new Promise((res) => setTimeout(res, RETRY_DELAY(attempt)));
        return retryFetch(attempt + 1);
      } else {
        throw err;
      }
    }
  };

  const fetchData = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    // Return cached result if valid
    if (useCache && cache.has(cacheKey)) {
      const cached = cache.get(cacheKey)!;
      if (isCacheValid(cached)) {
        setData(cached.data);
        setLoading(false);
        return;
      }
    }

    // Deduplicate ongoing requests
    if (pendingRequests.has(cacheKey)) {
      pendingRequests
        .get(cacheKey)!
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
      return;
    }

    setLoading(true);

    const request = retryFetch()
      .then((result) => {
        if (useCache)
          cache.set(cacheKey, { data: result, timestamp: Date.now() });
        setData(result);
        setError(null);
        return result;
      })
      .catch((err) => {
        if ((err as Error).name !== 'AbortError') {
          setError(err as Error);
          setData(null);
        }
        throw err;
      })
      .finally(() => {
        setLoading(false);
        pendingRequests.delete(cacheKey);
      });

    pendingRequests.set(cacheKey, request);
  }, [url, cacheKey, useCache, cacheTTL, retryCount]);

  useEffect(() => {
    fetchData();
    return () => controllerRef.current?.abort();
  }, dependencies);

  return { data, error, loading, refetch: fetchData };
}
