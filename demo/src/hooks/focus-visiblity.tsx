import { useRef, type RefObject } from 'react';
// import { useFocusVisible } from '../../src';
import './App.css';

function FocusVisiblity() {
  const ref = useRef<HTMLButtonElement>(null);
  const isFocusVisible = false;
  // useFocusVisible(ref as RefObject<HTMLButtonElement>);

  return (
    <div className="App">
      <h1>useKeyPress hook</h1>
      <button ref={ref}>Click me or focus me with keyboard</button>
      {isFocusVisible ? <p>Focus visible</p> : <p>Focus is not visible</p>}
    </div>
  );
}

export default FocusVisiblity;
