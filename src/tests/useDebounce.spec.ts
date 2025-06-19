import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../hooks';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('Should return the debounced value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: any; delay: number }) =>
        useDebounce(value, delay),
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

    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe('test');
  });
});
