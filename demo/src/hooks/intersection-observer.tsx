import { useRef, type JSX, type RefObject } from 'react';
import { useIntersectionObserver } from '../../src/hooks';

function IntersectionObserver(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const entry = useIntersectionObserver(ref as RefObject<Element>, {
    threshold: 0.5,
  });

  return (
    <div
      className="App"
      style={{
        width: '100%',
        height: '250vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>useIntersectionObserver hook</h1>
      <p
        ref={ref}
        style={{
          color: entry?.isIntersecting ? 'green' : 'red',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        Intersection observer: {entry?.isIntersecting ? 'visible' : 'hidden'}
      </p>
    </div>
  );
}

export default IntersectionObserver;
