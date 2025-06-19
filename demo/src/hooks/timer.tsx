import type { JSX } from 'react';
import { useTimer } from '../../../src/hooks';

function Timer(): JSX.Element {
  const { time, isRunning, start, pause, reset } = useTimer({
    autoStart: false,
    duration: 10000,
  });

  return (
    <div>
      <h1>Timer</h1>
      <p>Time: {time}</p>
      <p>Is running: {isRunning ? 'Yes' : 'No'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Timer;
