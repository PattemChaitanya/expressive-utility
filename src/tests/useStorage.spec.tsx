import { render } from '@testing-library/react';
import { useStorage } from '../hooks';

const TestComponent = ({
  keyName,
  initialValue,
  storageType,
}: {
  keyName: string;
  initialValue: any;
  storageType: 'local' | 'session';
}) => {
  const [value] = useStorage(keyName, initialValue, storageType);
  return <div data-testid="value">{value}</div>;
};

describe('useStorage', () => {
  it('should return the initial value', () => {
    const { getByTestId } = render(
      <TestComponent keyName="test" initialValue="hello" storageType="local" />,
    );
    expect(getByTestId('value').textContent).toBe('hello');
  });
});
