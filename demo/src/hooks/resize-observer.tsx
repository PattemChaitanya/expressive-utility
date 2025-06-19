import { useRef, type RefObject } from 'react';
// import { useResizeObserver } from '../../src';
import './App.css';

function ResizeObserver() {
  const ref = useRef<HTMLDivElement>(null);
  const size = {};
  // useResizeObserver(ref as RefObject<HTMLDivElement>);

  return (
    <div className="App">
      <h1>useResizeObserver hook</h1>
      <div
        ref={ref}
        style={{
          resize: 'both',
          overflow: 'auto',
          padding: '1rem',
          border: '1px solid #ccc',
          width: 200,
          height: 200,
        }}
      >
        <p>Width: {size?.width ?? '—'}</p>
        <p>Height: {size?.height ?? '—'}</p>
      </div>
    </div>
  );
}

export default ResizeObserver;
