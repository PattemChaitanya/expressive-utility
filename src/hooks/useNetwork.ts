import { useEffect, useState } from 'react';

export function useNetwork(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    // Check if window exists (for SSR compatibility)
    if (typeof window === 'undefined') return true;
    return navigator.onLine;
  });

  useEffect(() => {
    const handleOnline = () => {
      console.log('Network status changed: Online');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('Network status changed: Offline');
      setIsOnline(false);
    };

    // Log initial state
    console.log(
      'Initial network status:',
      navigator.onLine ? 'Online' : 'Offline',
    );

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Force an initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
