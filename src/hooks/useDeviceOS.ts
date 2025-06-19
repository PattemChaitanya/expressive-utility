import { useState, useEffect } from 'react';

export type DeviceOS =
  | 'iOS'
  | 'Android'
  | 'Windows'
  | 'macOS'
  | 'Linux'
  | 'Chrome OS'
  | 'Unknown';

export function useDeviceOS(): DeviceOS {
  const [os, setOS] = useState<DeviceOS>('Unknown');

  useEffect(() => {
    const userAgent = window.navigator.userAgent;

    if (/android/i.test(userAgent)) setOS('Android');
    else if (/iPad|iPhone|iPod/.test(userAgent)) setOS('iOS');
    else if (/Win/i.test(userAgent)) setOS('Windows');
    else if (/Mac/i.test(userAgent)) setOS('macOS');
    else if (/Linux/i.test(userAgent)) setOS('Linux');
    else if (/CrOS/i.test(userAgent)) setOS('Chrome OS');
    else setOS('Unknown');
  }, []);

  return os;
}
