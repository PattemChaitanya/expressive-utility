import { renderHook, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useQueryParam } from '../hooks/useQueryParam';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter initialEntries={['/path?test=hello']}>
    <Routes>
      <Route path="*" element={children} />
    </Routes>
  </MemoryRouter>
);

describe('useQueryParam', () => {
  it('should return the query param', () => {
    const { result } = renderHook(() => useQueryParam('test'), { wrapper });
    expect(result.current[0]).toBe('hello');
  });

  it('should set the query param', () => {
    const { result } = renderHook(() => useQueryParam('test'), { wrapper });

    act(() => {
      result.current[1]('world');
    });

    expect(result.current[0]).toBe('world');
  });

  it('should set the query param to null', () => {
    const { result } = renderHook(() => useQueryParam('test'), { wrapper });

    act(() => {
      result.current[1](null as unknown as string);
    });

    expect(result.current[0]).toBe(null);
  });
});
