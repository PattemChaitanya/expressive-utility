import type { JSX } from 'react';
import { useFullscreen } from '../../../src/hooks';

function FullScreen(): JSX.Element {
  const { ref, isFullscreen, toggleFullscreen } =
    useFullscreen<HTMLDivElement>();

  return (
    <div ref={ref} style={{ border: '1px solid #ccc', padding: 16 }}>
      <p>{isFullscreen ? 'In Fullscreen Mode' : 'Normal View'}</p>
      <button onClick={toggleFullscreen}>
        {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </button>
    </div>
  );
}

export default FullScreen;
