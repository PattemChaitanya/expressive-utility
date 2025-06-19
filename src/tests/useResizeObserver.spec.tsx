import React, { RefObject } from 'react';
import { render } from '@testing-library/react';
import { useResizeObserver } from '../hooks';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
});

describe('useResizeObserver', () => {
  const NullRefComponent = () => {
    const ref = React.useRef<HTMLElement>(null);
    const size = useResizeObserver(ref as RefObject<HTMLElement>);
    return <div data-testid="size">{size === null ? 'null' : 'not-null'}</div>;
  };

  it('should return null if the element is not available', () => {
    const { getByTestId } = render(<NullRefComponent />);
    expect(getByTestId('size').textContent).toBe('null');
  });
});
