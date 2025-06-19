import { useRef, type JSX } from 'react';
import './App.css';
import DetectDeviceOS from './hooks/detect-device-os';

function App(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="App" ref={ref}>
      <h1>useFullscreen hook</h1>
      <DetectDeviceOS />
    </div>
  );
}

export default App;
