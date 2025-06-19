import { useRef } from 'react';
// import { useScrollPosition } from '../../src/hooks/useScrollPosition';

function ScrollPosition() {
  const ref = useRef<HTMLDivElement>(null);
  const x = 0,
    y = 0;
  // const { x, y } = useScrollPosition();

  return (
    <div className="App" style={{ height: '10000px', width: '10000px' }}>
      <h1>useScrollPosition hook</h1>
      <div ref={ref}>
        <p>
          Scroll position - x: {x}, y: {y}
        </p>
      </div>
    </div>
  );
}

export default ScrollPosition;
