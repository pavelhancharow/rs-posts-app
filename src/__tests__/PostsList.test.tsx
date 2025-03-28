import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PostsList from '../components/PostsList/PostsList.tsx';
import { PostsListContext } from '../context/PostsListContext.tsx';
import mockData from '../__mocks__/mockData';
import { LoadingStatuses } from '../enums';
import { ApiResponse, TypePosts } from '../models';

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

    renderWithProviders(<PostsList />, providerProps);

    const postPreviews = screen.getAllByRole('listitem');
    expect(postPreviews).toHaveLength(mockApiResponses.posts.posts.length);

    mockApiResponses.posts.posts.forEach((post) => {
      const postTitle = screen.getByText(post.title);
      expect(postTitle).toBeInTheDocument();
    });
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    const providerProps = {
      data: {
        total: 0,
        skip: 0,
        limit: 25,
        posts: [],
      },
      status: LoadingStatuses.Fulfilled,
      error: null,
    };

    renderWithProviders(<PostsList />, providerProps);

    const NoContentComponent = screen.getByText(
      /No posts found for your search "/i
    );
    expect(NoContentComponent).toBeInTheDocument();
  });
});
