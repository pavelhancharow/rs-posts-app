import { render, screen } from '@testing-library/react';
import Loader from './Loader.tsx';

describe('Loader', () => {
  it('should find loader by role and render', () => {
    render(<Loader />);

    const loader = screen.getByRole('progressbar');

    expect(loader).toBeInTheDocument();
  });
});
