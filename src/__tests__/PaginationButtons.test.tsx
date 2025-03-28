import { ReactNode, useState } from 'react';
import { BrowserRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, beforeEach, vi, it } from 'vitest';
import PaginationButtons from '../components/PaginationButtons/PaginationButtons.tsx';
import {
  PostsListSearchQueryContext,
  PostsListUpdateSearchQueryContext,
} from '../context/PostsListContext.tsx';
import { PostsQueryParams } from '../models';

type useSearchQueryState = Omit<PostsQueryParams, 'select'>;

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockSearchQuery = { skip: 0, limit: 1 };
const TestWrapper = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<useSearchQueryState>(mockSearchQuery);

  return (
    <BrowserRouter>
      <PostsListSearchQueryContext.Provider value={query}>
        <PostsListUpdateSearchQueryContext.Provider
          value={(newQuery) => {
            setQuery((prev: useSearchQueryState) => ({
              ...prev,
              ...newQuery,
            }));
          }}
        >
          <div data-testid="query-display">{JSON.stringify(query)}</div>
          {children}
        </PostsListUpdateSearchQueryContext.Provider>
      </PostsListSearchQueryContext.Provider>
    </BrowserRouter>
  );
};

describe('Tests for the Pagination component (PaginationUI -> PaginationButtons)', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('updates URL query parameter when page changes', async () => {
    const user = userEvent.setup();
    const totalPosts = 10;

    render(
      <TestWrapper>
        <PaginationButtons total={totalPosts} disabled={false} />
      </TestWrapper>
    );

    const pageTwoButton = screen.getByText('2');
    expect(pageTwoButton).toBeInTheDocument();

    await user.click(pageTwoButton);

    expect(screen.getByTestId('query-display')).toHaveTextContent(
      JSON.stringify({ skip: 1, limit: 1 })
    );
  });
});
