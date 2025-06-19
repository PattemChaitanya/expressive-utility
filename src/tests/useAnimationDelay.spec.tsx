import { act, renderHook } from '@testing-library/react';
import { useAnimationDelay } from '../hooks/useAnimationDelay';

describe('useAnimationDelay', () => {
  it('should return false when active is false', () => {
    const { result } = renderHook(() => useAnimationDelay(200, false));
    expect(result.current).toBe(false);
  });

  it('should return true after the specified delay when active is true', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useAnimationDelay(200, true));

    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe(true);
    jest.useRealTimers();
  });

  it('should reset to false when active changes to false', () => {
    jest.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ active }) => useAnimationDelay(200, active),
      {
        initialProps: { active: true },
      },
    );

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe(true);

    rerender({ active: false });

    expect(result.current).toBe(false);

    jest.useRealTimers();
  });
});
