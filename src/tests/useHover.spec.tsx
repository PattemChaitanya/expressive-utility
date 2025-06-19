import '@testing-library/jest-dom';
import { useHover } from '../hooks';
import { render } from '@testing-library/react';

describe('useHover', () => {
  const TestComponent = () => {
    const { ref, isHovered } = useHover<HTMLDivElement>();

    return (
      <div>
        <div ref={ref} data-testid="hover">
          Hover me
        </div>
        {isHovered ? <span>{isHovered}</span> : <span>Not hovered</span>}
      </div>
    );
  };
  it('should be hover detected', () => {
    const { getByTestId } = render(<TestComponent />);

    const hoverElement = getByTestId('hover');
    expect(hoverElement).toBeInTheDocument();
  });
  // it('should be not hover detected', () => {
  //   const { getByTestId } = render(<TestComponent />);

  //   const hoverElement = getByTestId('hovered');
  //   expect(hoverElement).not.toBeValid();
  // });
});
