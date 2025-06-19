import { useRef } from 'react';
import { useMediaQuery } from '../../src';
import './App.css';

function MediaQuery() {
  const ref = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery('(min-width: 600px)');
  const width = matches ? '600px or more' : 'less than 600px';
  const mediaQuery = `(min-width: 600px) and (min-height: 400px)`;
  const isMediaQueryMatched = useMediaQuery(mediaQuery);
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div className="App">
      <h1>useWindowSize hook</h1>
      <div ref={ref}>
        <p>Media Query "min-width: 600px" - {width}</p>
        <p>
          Media query {mediaQuery} matched -
          {isMediaQueryMatched ? 'true' : 'false'}.
        </p>
        <p>Dark mode preferred - {isDarkMode ? 'true' : 'false'}</p>
      </div>
    </div>
  );
}

export default MediaQuery;
