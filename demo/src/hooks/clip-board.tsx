import { useRef, type JSX } from 'react';
import { useClipboard } from '../../../src/hooks';

function ClipBoard(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const { copy, copied, error } = useClipboard();

  return (
    <div ref={ref}>
      <h1>useClipboard hook</h1>
      <p>This is a test</p>
      <button onClick={() => copy('Hello, world!')}>Copy</button>
      {copied && <p>Copied!</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export function ClipBoard2(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const { copy, read, copied, readValue, error } = useClipboard();

  return (
    <div ref={ref}>
      <button onClick={() => copy('Hello!')}>
        {copied ? 'Copied' : 'Copy'}
      </button>
      <button onClick={read}>Read Clipboard</button>
      <p>Clipboard contains: {readValue}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ClipBoard;
