import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect } from 'vitest';
import PaginationUI from './PaginationUI.tsx';
import PostsListContextProvider from '../../context/PostsListContext.tsx';

describe('PaginationUI', () => {
  it('should render pagination controls after initial load', async () => {
    render(
      <MemoryRouter initialEntries={['/posts?skip=0&limit=25']}>
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
