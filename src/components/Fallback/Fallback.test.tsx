import { render, screen } from '@testing-library/react';
import Fallback from './Fallback.tsx';

describe('Fallback', () => {
  it('should render error message with info is provided', () => {
    render(
      <Fallback
        error={{ name: '404', message: 'Not Found' }}
        componentStack={'Page Not found'}
      />
    );

    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.getByText('Page Not found')).toBeInTheDocument();
  });

  it('should render error default message with info is not provided', () => {
    render(<Fallback error={{} as Error} componentStack={''} />);

    expect(screen.getByText('Unknown error')).toBeInTheDocument();
    expect(screen.getByText('No stacktrace available')).toBeInTheDocument();
  });
});
