import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { RefObject } from 'react';

describe('useIntersectionObserver', () => {
  it('should return the correct entry', () => {
    const ref = { current: null } as unknown as RefObject<Element>;

    const { result } = renderHook(() => useIntersectionObserver(ref));
    expect(result.current).toBe(null);
  });
});
