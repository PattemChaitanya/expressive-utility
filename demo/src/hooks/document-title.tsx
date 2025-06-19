import { useRef, useState, type JSX } from 'react';
import './App.css';
import { useTitle } from '../../../src/hooks';

function DocumentTitle(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('Dashboard - MyApp');
  useTitle(title);

  return (
    <div className="App" ref={ref}>
      <h1>useTitle hook</h1>
      <p>This is a test</p>
      <button onClick={() => setTitle('New Title')}>Change Title</button>
    </div>
  );
}

export default DocumentTitle;
