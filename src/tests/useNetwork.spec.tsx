import { renderHook, act } from '@testing-library/react';
import { useNetwork } from '../hooks/useNetwork';

describe('useNetwork', () => {
  // Store original navigator.onLine value
  const originalOnline = window.navigator.onLine;

  beforeEach(() => {
    // Mock the online property
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: true,
    });
  });

  afterEach(() => {
    // Restore original value
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: originalOnline,
    });
  });

  it('should return true when online', () => {
    const { result } = renderHook(() => useNetwork());
    expect(result.current).toBe(true);
  });

  it('should return false when offline', () => {
    // Set navigator.onLine to false
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: false,
    });

    const { result } = renderHook(() => useNetwork());
    expect(result.current).toBe(false);
  });

  it('should update when online status changes', () => {
    const { result } = renderHook(() => useNetwork());

    // Initially online
    expect(result.current).toBe(true);

    // Simulate going offline
    act(() => {
      Object.defineProperty(window.navigator, 'onLine', {
        configurable: true,
        value: false,
      });
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current).toBe(false);

    // Simulate going online
    act(() => {
      Object.defineProperty(window.navigator, 'onLine', {
        configurable: true,
        value: true,
      });
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current).toBe(true);
  });
});
