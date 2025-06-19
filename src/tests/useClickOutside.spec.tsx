import { useRef, RefObject } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useClickOutside } from '../hooks/useClickOutside';

describe('useClickOutside', () => {
  it('should call the handler when clicking outside of the element', () => {
    const handler = jest.fn();

    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref as RefObject<HTMLDivElement>, handler);

      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    // Click outside the ref -> should call handler
    fireEvent.mouseDown(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);

    // Click inside the ref -> should NOT call handler again
    fireEvent.mouseDown(getByTestId('inside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
