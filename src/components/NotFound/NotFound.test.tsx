import { render, screen } from '@testing-library/react';
import NotFound from './NotFound.tsx';

describe('NotFound', () => {
  it('should render the component correctly', async () => {
    render(<NotFound>Hello world!</NotFound>);

    expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
  });
});
