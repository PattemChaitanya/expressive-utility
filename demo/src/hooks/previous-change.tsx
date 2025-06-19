import { useRef, useState } from 'react';
import { usePrevious } from '../../../src/hooks';

function PreviousChange() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div className="App">
      <h1>usePreviousChange hook</h1>
      <div ref={ref}>
        <p>Count: {count}</p>
        <p>Previous count: {previousCount}</p>

        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
    </div>
  );
}

export default PreviousChange;
