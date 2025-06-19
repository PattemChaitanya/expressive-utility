import { useState, useEffect } from 'react';

type StorageType = 'local' | 'session';

export function useStorage<T>(
  key: string,
  initialValue: T,
  storageType: StorageType = 'local',
): [T, (value: T) => void] {
  const storage = storageType === 'local' ? localStorage : sessionStorage;

  const [value, setValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading ${storage} key "${key}":`, error);
      return initialValue;
    }
  });

  const setInitialValue = (value: T) => {
    try {
      const valueToStore = typeof value === 'function' ? value(value) : value;
      setValue(valueToStore);
      storage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting ${storage} key "${key}":`, error);
    }
  };

  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${storage} key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setInitialValue];
}
