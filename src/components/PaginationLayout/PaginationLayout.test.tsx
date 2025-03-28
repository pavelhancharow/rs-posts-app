import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect } from 'vitest';
import { renderWithProviders } from '../../utils';
import PaginationLayout from './PaginationLayout.tsx';
import SearchQueryContextProvider from '../../context/SearchQueryContext';

describe('PaginationLayout', () => {
  it('should render pagination controls after initial load', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/posts?page=1&perPage=25']}>
        <SearchQueryContextProvider>
          <PaginationLayout />
        </SearchQueryContextProvider>
      </MemoryRouter>
    );

    expect(screen.queryByRole('select')).not.toBeInTheDocument();
    screen.queryAllByRole('button').forEach((button) => {
      expect(button).not.toBeInTheDocument();
    });

    expect(await screen.findByRole('select')).toBeInTheDocument();
    expect(await screen.findAllByRole('button')).toHaveLength(3);
  });
});
