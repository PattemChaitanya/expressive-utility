import { useCallback, useState } from 'react';

export function useClipboard(resetDelay: number = 2000) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [readValue, setReadValue] = useState<string>('');

  const copy = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        setError('Clipboard API not supported');
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        if (resetDelay > 0) {
          setTimeout(() => setCopied(false), resetDelay);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [resetDelay],
  );

  const read = useCallback(async () => {
    if (!navigator?.clipboard) {
      setError('Clipboard API not supported');
      return;
    }

    try {
      const text = await navigator.clipboard.readText();
      setReadValue(text);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  return { copy, read, copied, readValue, error };
}
