import { render, screen } from '@testing-library/react';
import PaginationRange from './PaginationRange.tsx';

describe('PaginationRange', () => {
  it('should display the correct range and total', () => {
    render(<PaginationRange skip={0} limit={25} total={100} />);

    expect(screen.getByText('1 - 25')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
