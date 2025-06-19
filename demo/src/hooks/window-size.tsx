import { useRef } from 'react';
// import { useWindowResize } from '../../src';
import './App.css';

function WindowSize() {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = { width: 100, height: 100 }; // Placeholder for useWindowResize hook
  // const { width, height } = useWindowResize();

  return (
    <div>
      <h1>useWindowResize hook</h1>
      <div ref={ref}>
        <p>Width: {width}</p>
        <p>Height: {height}</p>
      </div>
    </div>
  );
}

export default WindowSize;
