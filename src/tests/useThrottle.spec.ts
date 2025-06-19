import { renderHook, act } from '@testing-library/react';
import { useThrottle } from '../hooks/useThrottle';

jest.useFakeTimers();

describe('Use Throttle', () => {
  it('Should return the throttled value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: any; delay: number }) =>
        useThrottle(value, delay),
      {
        initialProps: { value: 'a', delay: 500 },
      },
    );

    expect(result.current).toBe('a');

    rerender({ value: 'test', delay: 500 });

    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(499);
    });

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe('test');
  });
});
