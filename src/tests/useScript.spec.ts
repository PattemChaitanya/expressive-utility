import { renderHook } from '@testing-library/react';
import { useScript } from '../hooks/useScript';

describe('useScript', () => {
  it('should return the correct state', () => {
    const { result } = renderHook(() =>
      useScript('https://example.com/script.js'),
    );
    expect(result.current).toBe('idle');
  });

  it('should return the correct state when the script is loaded', () => {
    const { result } = renderHook(() =>
      useScript('https://example.com/script.js'),
    );
    expect(result.current).toBe('ready');
  });

  it('should return the correct state when the script is loaded', () => {
    const { result } = renderHook(() =>
      useScript('https://example.com/script.js'),
    );
    expect(result.current).toBe('ready');
  });
});
