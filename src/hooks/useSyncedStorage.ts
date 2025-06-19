import { useState, useEffect } from 'react';

type StorageType = 'local' | 'session';

export function useSyncedStorage<T>(
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

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.storageArea !== storage) {
        try {
          setValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (error) {
          setValue(initialValue);
          console.error(`Error parsing ${storage} key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, storage]);

  return [value, setInitialValue];
}
