import { render, screen } from '@testing-library/react';
import ErrorComponent from './ErrorComponent.tsx';

describe('ErrorComponent', () => {
  it('should render error message with info is provided', () => {
    render(
      <ErrorComponent info={'There was a problem processing the request'} />
    );

    expect(
      screen.getByText(/There was a problem processing the request/i)
    ).toBeInTheDocument();
  });

  it('should render error message with info is not provided', () => {
    render(<ErrorComponent info={null} />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
