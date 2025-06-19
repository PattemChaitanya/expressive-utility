import React from 'react';
import { render, act } from '@testing-library/react';
import { useWindowSize } from '../hooks';

const TestComponent = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      <span data-testid="width">{width}</span>
      <span data-testid="height">{height}</span>
    </div>
  );
};

describe('useWindowSize', () => {
  it('should return the initial window size', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('width').textContent).toBe(String(window.innerWidth));
    expect(getByTestId('height').textContent).toBe(String(window.innerHeight));
  });

  it('should update the window size on resize', () => {
    const { getByTestId } = render(<TestComponent />);
    act(() => {
      (window as any).innerWidth = 500;
      (window as any).innerHeight = 400;
      window.dispatchEvent(new Event('resize'));
    });
    expect(getByTestId('width').textContent).toBe('500');
    expect(getByTestId('height').textContent).toBe('400');
  });
});
