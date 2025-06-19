import { type JSX } from 'react';
import { useDeviceOS } from '../../../src/hooks';

const DetectDeviceOS = (): JSX.Element => {
  const deviceOS = useDeviceOS();
  return (
    <div>
      <h1>Detect Device OS</h1>
      <p>Device OS: {deviceOS}</p>
    </div>
  );
};

export default DetectDeviceOS;
