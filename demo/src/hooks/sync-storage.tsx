import { useRef, type JSX } from 'react';
import { useSyncedStorage } from '../../src/hooks/useSyncedStorage';
import './App.css';

function SyncStorage(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const [layoutMode, setLayoutMode] = useSyncedStorage<'grid' | 'list'>(
    'layout',
    'grid',
    'session',
  );

  return (
    <div className="App">
      <h1>useSyncedStorage hook</h1>
      <input type="text" ref={ref} />
      <input
        type="submit"
        onClick={() => setLayoutMode(ref?.current?.value as 'grid' | 'list')}
      />
      <p>Layout mode: {layoutMode}</p>
    </div>
  );
}

export default SyncStorage;
