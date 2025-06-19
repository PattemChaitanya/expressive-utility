import { renderHook } from '@testing-library/react';
import { useCookie } from '../hooks';

describe('useCookie', () => {
  it('should return the cookie value', () => {
    const { result } = renderHook(() => useCookie('test', 'test'));
    expect(result.current[0]).toBe('test');
  });

  it('should set the cookie value', () => {
    const { result } = renderHook(() => useCookie('test', 'test'));
    result.current[1]('new value');
    expect(document.cookie).toBe('test=new%20value');
  });
});
