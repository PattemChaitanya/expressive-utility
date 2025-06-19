import { renderHook } from '@testing-library/react';
import { useEncodeURLString } from '../hooks/useEncodeURLString';

describe('useEncodeURLString', () => {
  it('should encode a string', () => {
    const { result } = renderHook(() => useEncodeURLString());
    expect(result.current('test')).toBe('test');
  });

  it('should encode an object', () => {
    const { result } = renderHook(() => useEncodeURLString());
    expect(result.current({ test: 'test' })).toBe('test=test');
  });
});
