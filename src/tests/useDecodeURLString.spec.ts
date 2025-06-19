import { renderHook } from '@testing-library/react';
import { useDecodeURLString } from '../hooks/useDecodeURLString';

describe('useDecodeURLString', () => {
  it('should decode the URL string', () => {
    const { result } = renderHook(() => useDecodeURLString());
    const decoded = result.current('?name=John Doe&age=25&city=New York');
    expect(decoded).toEqual({
      name: 'John Doe',
      age: '25',
      city: 'New York',
    });
  });
});
