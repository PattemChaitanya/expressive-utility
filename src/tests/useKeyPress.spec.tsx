import { render, fireEvent } from '@testing-library/react';
import { useKeyPress } from '../hooks/useKeyPress';
import React from 'react';

type keyCombo = {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
};

const TestComponent = ({ targetKey }: { targetKey: keyCombo }) => {
  const isPressed = useKeyPress(targetKey);
  return (
    <div data-testid="status">{isPressed ? 'pressed' : 'not pressed'}</div>
  );
};

describe('useKeyPress', () => {
  it('should return true if the key is pressed', () => {
    const { getByTestId } = render(<TestComponent targetKey={{ key: 'k' }} />);
    fireEvent.keyDown(window, { key: 'k' });
    expect(getByTestId('status').textContent).toBe('pressed');
  });

  it('should return false initially', () => {
    const { getByTestId } = render(
      <TestComponent targetKey={{ key: 'k', ctrlKey: true }} />,
    );
    expect(getByTestId('status').textContent).toBe('not pressed');
  });

  it('should return true when the specified key is pressed', () => {
    const { getByTestId } = render(
      <TestComponent targetKey={{ key: 'k', ctrlKey: true }} />,
    );
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(getByTestId('status').textContent).toBe('pressed');
  });

  it('should return false when the specified key is released', () => {
    const { getByTestId } = render(
      <TestComponent targetKey={{ key: 'k', ctrlKey: true }} />,
    );
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    fireEvent.keyUp(window, { key: 'k', ctrlKey: true });
    expect(getByTestId('status').textContent).toBe('not pressed');
  });

  it('should handle multiple key combinations', () => {
    const { getByTestId } = render(
      <TestComponent targetKey={{ key: 'k', ctrlKey: true, shiftKey: true }} />,
    );
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true, shiftKey: true });
    expect(getByTestId('status').textContent).toBe('pressed');
    fireEvent.keyUp(window, { key: 'k', ctrlKey: true, shiftKey: true });
    expect(getByTestId('status').textContent).toBe('not pressed');
  });
});
