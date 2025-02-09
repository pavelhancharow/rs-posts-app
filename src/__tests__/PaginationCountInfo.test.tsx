import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PaginationCountInfo from '../components/PaginationCountInfo/PaginationCountInfo.tsx';

describe('PaginationCountInfo component', () => {
  it('should display the correct range and total', () => {
    const props = {
      skip: 0,
      limit: 25,
      total: 100,
    };

    render(<PaginationCountInfo {...props} />);

    expect(screen.getByText('1 - 25')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
