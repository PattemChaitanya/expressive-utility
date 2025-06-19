import { useRef, RefObject } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useFocusTrap } from '../hooks';

describe('useFocusTrap', () => {
  const TestComponent = () => {
    const ref = useRef<HTMLDivElement>(null);
    useFocusTrap(ref as RefObject<HTMLElement>);

    return (
      <div ref={ref} data-testid="focus-trap">
        <button data-testid="first-button">First Button</button>
        <button data-testid="second-button">Second Button</button>
        <button data-testid="third-button">Third Button</button>
      </div>
    );
  };
  it('should trap focus within the component', () => {
    const { getByTestId } = render(<TestComponent />);

    const firstButton = getByTestId('first-button');
    const secondButton = getByTestId('second-button');
    const thirdButton = getByTestId('third-button');

    // Simulate focusing the first button
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);

    // Simulate pressing Tab to move focus
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toBe(secondButton);

    // Simulate pressing Tab again
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toBe(thirdButton);

    // Simulate pressing Tab again, should loop back to first button
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toBe(firstButton);
  });
  it('should cycle focus backwards with Shift + Tab', () => {
    const { getByTestId } = render(<TestComponent />);

    const firstButton = getByTestId('first-button');
    const secondButton = getByTestId('second-button');
    const thirdButton = getByTestId('third-button');

    // Simulate focusing the third button
    thirdButton.focus();
    expect(document.activeElement).toBe(thirdButton);

    // Simulate pressing Shift + Tab to move focus backwards
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(secondButton);

    // Simulate pressing Shift + Tab again
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(firstButton);

    // Simulate pressing Shift + Tab again, should loop back to third button
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(thirdButton);
  });
  it('should focus the first button when no element is focused', () => {
    const { getByTestId } = render(<TestComponent />);

    const firstButton = getByTestId('first-button');

    // Simulate focusing the body (no element focused)
    document.body.focus();
    expect(document.activeElement).toBe(document.body);

    // Focus should move to the first button
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toBe(firstButton);
  });
  it('should not trap focus if no focusable elements are present', () => {
    const { getByTestId } = render(
      <div data-testid="no-focusable-elements"></div>,
    );

    const noFocusableElements = getByTestId('no-focusable-elements');

    // Simulate focusing the body
    document.body.focus();
    expect(document.activeElement).toBe(document.body);

    // No focus trap should occur, so Tab should not change focus
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toBe(document.body);
  });
  it('should not trap focus if ref is null', () => {
    const { getByTestId } = render(<div data-testid="null-ref"></div>);

    const nullRefElement = getByTestId('null-ref');

    // Simulate focusing the body
    document.body.focus();
    expect(document.activeElement).toBe(document.body);

    // No focus trap should occur, so Tab should not change focus
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toBe(document.body);
  });
  it('should not trap focus if no ref is provided', () => {
    const { getByTestId } = render(<div data-testid="no-ref"></div>);

    const noRefElement = getByTestId('no-ref');

    // Simulate focusing the body
    document.body.focus();
    expect(document.activeElement).toBe(document.body);

    // No focus trap should occur, so Tab should not change focus
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toBe(document.body);
  });
  it('should not trap focus if the ref is not a valid HTMLDivElement', () => {
    const { getByTestId } = render(
      <div data-testid="invalid-ref" ref={null}></div>,
    );

    const invalidRefElement = getByTestId('invalid-ref');

    // Simulate focusing the body
    document.body.focus();
    expect(document.activeElement).toBe(document.body);

    // No focus trap should occur, so Tab should not change focus
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(document.activeElement).toBe(document.body);
  });
});
