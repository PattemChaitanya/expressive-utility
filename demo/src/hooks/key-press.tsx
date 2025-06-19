import { useRef } from 'react';
// import { useKeyPress } from '../../src';

function KeyPress() {
  const ref = useRef(null);
  const isKeyPressed = false;
  //   useKeyPress({
  //   key: 'k',
  //   altKey: true,
  // });

  return (
    <div className="App" ref={ref}>
      <h1>useKeyPress hook</h1>
      {isKeyPressed ? (
        <p>The "S" key with "ctrl" pressed is currently active!</p>
      ) : (
        <p>Press "Ctrl + S" to see the effect.</p>
      )}
    </div>
  );
}

export default KeyPress;
