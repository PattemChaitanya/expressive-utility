import { renderHook } from '@testing-library/react';
import { usePrevious } from '../hooks/usePrevious';

describe('usePrevious', () => {
  it('should return undefined on initial render', () => {
    const { result } = renderHook(() => usePrevious(1));
    expect(result.current).toBeUndefined();
  });
  it('should return the previous value after a render', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });
    expect(result.current).toBeUndefined();

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });
  it('should return the previous value for different types', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'test' },
    });
    expect(result.current).toBeUndefined();

    rerender({ value: 'new test' });
    expect(result.current).toBe('test');

    rerender({ value: '42' });
    expect(result.current).toBe('new test');
  });
});
