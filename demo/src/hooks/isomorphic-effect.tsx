import { useRef, useState, type JSX } from 'react';
import { useIsomorphicEffect } from '../../../src/hooks';
import ReactDOM from 'react-dom';

function IsomorphicEffect(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div className="App" ref={ref}>
      <h1>useIsomorphicEffect hook</h1>
      <p
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        Mutation
      </p>
      {isHover && (
        <Tooltip anchorRef={ref as React.RefObject<HTMLElement>}>
          <div>I’m a tooltip</div>
        </Tooltip>
      )}
    </div>
  );
}

const Tooltip = ({
  children,
  anchorRef,
}: {
  children: React.ReactNode;
  anchorRef: React.RefObject<HTMLElement>;
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useIsomorphicEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
    }
  }, [anchorRef]);

  return ReactDOM.createPortal(
    <div style={{ position: 'absolute', ...position }}>{children}</div>,
    document.body,
  );
};

export default IsomorphicEffect;
