import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { useToggle } from '../hooks';

describe('useToggle', () => {
  const TestComponent = () => {
    const { value, toggle, setSpecificValue } = useToggle(false);

    return (
      <div>
        <button onClick={toggle} data-testid="toggle-button">
          Toggle button
        </button>
        <button onClick={() => setSpecificValue(true)} data-testid="set-button">
          Set To true
        </button>
        <p data-testid="current-value">{value ? 'true' : 'false'}</p>
      </div>
    );
  };

  it('should toggle value on button click', () => {
    const { getByTestId } = render(<TestComponent />);

    const toggleButton = getByTestId('toggle-button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton.textContent).toBe('Toggle button');

    fireEvent.click(toggleButton);
    expect(getByTestId('current-value').textContent).toBe('true');

    fireEvent.click(getByTestId('set-button'));
    expect(getByTestId('current-value').textContent).toBe('true');
  });
});
