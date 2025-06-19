import { act, renderHook } from '@testing-library/react';
import { useScrollPosition } from '../hooks/useScrollPosition';

describe('useScrollPosition', () => {
  beforeAll(() => {
    window.scrollTo = ((xOrOptions: number | ScrollToOptions, y?: number) => {
      let x = 0,
        yVal = 0;
      if (typeof xOrOptions === 'number') {
        x = xOrOptions;
        yVal = y ?? 0;
      } else if (typeof xOrOptions === 'object') {
        x = xOrOptions.left ?? 0;
        yVal = xOrOptions.top ?? 0;
      }
      Object.defineProperty(window, 'scrollX', {
        value: x,
        configurable: true,
      });
      Object.defineProperty(window, 'scrollY', {
        value: yVal,
        configurable: true,
      });
    }) as typeof window.scrollTo;
  });

  it('should return the current scroll position', () => {
    const { result } = renderHook(() => useScrollPosition());

    // Initial scroll position should be (0, 0)
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('should update the scroll position on scroll', () => {
    const { result } = renderHook(() => useScrollPosition());

    // Simulate a scroll event
    act(() => {
      window.scrollTo(100, 200);
      window.dispatchEvent(new Event('scroll'));
    });
    console.log(result.current);

    // Check if the scroll position has been updated
    expect(result.current).toEqual({ x: 100, y: 200 });
  });
});
