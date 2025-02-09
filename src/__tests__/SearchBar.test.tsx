import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode, useState } from 'react';
import { BrowserRouter } from 'react-router';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { localStorageService } from '../api';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import {
  PostsListSearchQueryContext,
  PostsListUpdateSearchQueryContext,
} from '../context/PostsListContext.tsx';
import { PostsQueryParams } from '../models';

type useSearchQueryState = Omit<PostsQueryParams, 'select'>;

const mockSearchQuery = { skip: 0, limit: 25, q: 'Hello World!' };
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

describe('Tests for the Search component (SearchBar)', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    vi.spyOn(localStorageService, 'searchParams', 'get').mockReturnValue(
      mockSearchQuery
    );

    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('Search')).toHaveValue('Hello World!');
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByRole('button');

    await user.clear(input);
    await user.type(input, 'John Doe');

    await user.click(searchButton);

    expect(screen.getByTestId('query-display')).toHaveTextContent(
      JSON.stringify({ skip: 0, limit: 25, q: 'John Doe' })
    );

    expect(screen.getByPlaceholderText('Search')).toHaveValue('John Doe');
  });
});
