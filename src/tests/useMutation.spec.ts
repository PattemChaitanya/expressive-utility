import { renderHook } from '@testing-library/react';
import { useMutation } from '../hooks/useMutation';

describe('useMutation', () => {
  it('should return the correct data', () => {
    const mutationFn = jest.fn();
    const { result } = renderHook(() => useMutation(mutationFn));
    expect(result.current.data).toBe(null);
  });
});
