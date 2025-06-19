import { renderHook } from '@testing-library/react';
import { useIdle } from '../hooks/useIdle';

describe('useIdle', () => {
  it('should return false when the user is idle', () => {
    const { result } = renderHook(() => useIdle());
    expect(result.current).toBe(false);
  });
});
