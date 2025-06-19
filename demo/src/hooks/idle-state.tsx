import { useRef, type JSX } from 'react';
import { useIdle } from '../../../src/hooks';

export function IdleState(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const isIdle = useIdle(3000);

  return (
    <div ref={ref}>
      <h1>useIdle hook</h1>
      <p>Is idle: {isIdle ? 'true' : 'false'}</p>
    </div>
  );
}

export function IdleStateWithCallback(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const isIdle = useIdle(3000, (idle) => {
    console.log(idle ? 'User is idle' : 'User is active');
  });

  return (
    <div ref={ref}>
      <h1>useIdle hook</h1>
      <p>Is idle: {isIdle ? 'true' : 'false'}</p>
    </div>
  );
}
