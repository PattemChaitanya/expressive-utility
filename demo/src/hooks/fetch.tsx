import { useRef, type JSX } from 'react';
import './App.css';
import { useFetch } from '../../src/hooks';

function Fetch(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const { data, error, loading, refetch } = useFetch<any[]>(
    'https://jsonplaceholder.typicode.com/todos/1',
  );

  return (
    <div className="App">
      <h1>useStorage hook</h1>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Error: {JSON.stringify(error)}</p>
      <p>Loading: {JSON.stringify(loading)}</p>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}

export default Fetch;
