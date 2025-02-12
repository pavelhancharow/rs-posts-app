import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect } from 'vitest';
import { renderWithProviders } from '../../utils';
import PaginationUI from './PaginationUI.tsx';
import PostsListContextProvider from '../../context/PostsListContext.tsx';

describe('PaginationUI', () => {
  it('should render pagination controls after initial load', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/posts?page=1&perPage=25']}>
        <PostsListContextProvider>
          <PaginationUI />
        </PostsListContextProvider>
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
