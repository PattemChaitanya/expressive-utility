import { useRef, type JSX } from 'react';
import { useMutation } from '../../../src/hooks';

function Mutation(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  const { data, loading, error, mutate, cancel } = useMutation(
    () => new Promise((resolve) => setTimeout(() => resolve('Hello'), 1000)),
  );

  return (
    <div className="App" ref={ref}>
      <h1>useMutation hook</h1>
      <button onClick={() => mutate()}>Mutate</button>
      <button onClick={() => cancel()}>Cancel</button>
      <p>Data: {data as string}</p>
      <p>Loading: {loading ? 'true' : 'false'}</p>
      <p>Error: {error as string}</p>
    </div>
  );
}

export default Mutation;
