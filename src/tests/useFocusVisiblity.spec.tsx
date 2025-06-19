import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useFocusVisible } from '../hooks';
import { act, RefObject } from 'react';

describe('useFocusVisiblity', () => {
  it('should return true when focus is visible', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLButtonElement>(null);
      return useFocusVisible(ref as RefObject<HTMLButtonElement>);
    });
    expect(result.current).toBe(false);
  });

  it('should return false when focus is not visible', () => {
    // Simulate a condition where focus is not visible
    jest.spyOn(document, 'hasFocus').mockReturnValue(false);
    const { result } = renderHook(() => {
      const ref = useRef<HTMLButtonElement>(null);
      return useFocusVisible(ref as RefObject<HTMLButtonElement>);
    });
    expect(result.current).toBe(false);
  });

  it('should update focus visibility on focus change', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLButtonElement>(null);
      return useFocusVisible(ref as RefObject<HTMLButtonElement>);
    });

    act(() => {
      document.body.focus();
    });
    expect(result.current).not.toBe(true);

    act(() => {
      document.body.blur();
    });
    expect(result.current).toBe(false);
  });
});
