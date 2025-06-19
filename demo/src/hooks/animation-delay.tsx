import { useRef, useState, type JSX } from 'react';
// import { useAnimationDelay } from '../../src/hooks/useAnimationDelay';

function AnimationDelay(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(false);
  const animate = true;
  // const animate = useAnimationDelay(3000, count);

  return (
    <div className="App">
      <h1>useAnimationDelay hook</h1>
      <div ref={ref}>
        <button onClick={() => setCount((prev) => !prev)}>Toggle</button>
        <div
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 0.3s ease',
          }}
        >
          Delayed Animation Box
        </div>
      </div>
    </div>
  );
}

export default AnimationDelay;
