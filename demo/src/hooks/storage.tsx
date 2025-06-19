import { useRef, type JSX } from 'react';
import { useStorage } from '../../src/hooks/useStorage';
import './App.css';

function Storage(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const [layoutMode, setLayoutMode] = useStorage<'grid' | 'list'>(
    'layout',
    'grid',
    'local',
  );

  return (
    <div className="App">
      <h1>useStorage hook</h1>
      <input type="text" ref={ref} />
      <input
        type="submit"
        onClick={() => setLayoutMode(ref?.current?.value as 'grid' | 'list')}
      />
      <p>Layout mode: {layoutMode}</p>
    </div>
  );
}

export default Storage;
