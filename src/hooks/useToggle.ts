import { useCallback, useState } from 'react';

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  const setSpecificValue = useCallback((value: boolean) => setValue(value), []);

  return { value, toggle, setSpecificValue } as const;
};
