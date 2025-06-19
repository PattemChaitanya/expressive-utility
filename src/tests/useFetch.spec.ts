import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../hooks';

describe('useFetch', () => {
  it('should fetch data', async () => {
    const { result } = renderHook(() =>
      useFetch('https://jsonplaceholder.typicode.com/todos/1'),
    );
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
