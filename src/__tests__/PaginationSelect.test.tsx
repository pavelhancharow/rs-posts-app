import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi, it } from 'vitest';
import PaginationSelect from '../components/PaginationSelect/PaginationSelect.tsx';
import {
  PostsListSearchQueryContext,
  PostsListUpdateSearchQueryContext,
} from '../context/PostsListContext.tsx';

const mockUpdateSearchQuery = vi.fn();

const mockSearchQuery = { skip: 1, limit: 25 };

const TestWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <PostsListSearchQueryContext.Provider value={mockSearchQuery}>
        <PostsListUpdateSearchQueryContext.Provider
          value={mockUpdateSearchQuery}
        >
          {children}
        </PostsListUpdateSearchQueryContext.Provider>
      </PostsListSearchQueryContext.Provider>
    </BrowserRouter>
  );
};

describe('Tests for the Pagination component (PaginationUI -> PaginationSelect)', () => {
  it('updates URL query parameter when limit change', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <PaginationSelect disabled={false} />
      </TestWrapper>
    );

    const selectElement = screen.getByRole('combobox');

    await user.selectOptions(selectElement, '50');

    expect(mockUpdateSearchQuery).toHaveBeenCalledWith({
      limit: 50,
      skip: 0,
    });
  });
});
