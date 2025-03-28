import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PostsListContext } from '../context/PostsListContext.tsx';
import mockData from '../__mocks__/mockData';
import { LoadingStatuses } from '../enums';
import { ApiResponse, TypePosts } from '../models';
import PostsPage from '../pages/PostsPage.tsx';

interface PostsListContextState {
  data: ApiResponse<TypePosts>;
  error: string | null;
  status: LoadingStatuses;
}

const { mockApiResponses } = mockData;

const renderWithProviders = (
  ui: ReactElement,
  props: PostsListContextState
) => {
  return render(
    <BrowserRouter>
      <PostsListContext.Provider value={props}>{ui}</PostsListContext.Provider>
    </BrowserRouter>
  );
};

describe('Tests for the Card List component (PostsList)', () => {
  it('Verify that the component renders the specified number of cards', () => {
    const providerProps = {
      data: mockApiResponses.posts,
      status: LoadingStatuses.Fulfilled,
      error: null,
    };

    renderWithProviders(<PostsPage />, providerProps);

    const postPreviews = screen.getByText('Throw An Error');
    expect(postPreviews).toBeInTheDocument();
  });
});
