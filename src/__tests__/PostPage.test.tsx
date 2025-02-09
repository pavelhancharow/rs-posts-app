import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Outlet, Route, Routes, useNavigate } from 'react-router';
import mockData from '../__mocks__/mockData.ts';
import PostPreview from '../components/PostPreview/PostPreview.tsx';
import { FullPostContext } from '../context/FullPostContext.tsx';
import { LoadingStatuses } from '../enums';
import { withQueryParam } from '../helpers';
import { FullPostCard, Post } from '../models';
import PostPage from '../pages/PostPage';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

const { mockFullPostCards, mockPosts } = mockData;

vi.mock('../api/PostsService', () => ({
  postsService: {
    getPostById: vi.fn(),
    getAllPosts: vi.fn(),
  },
}));

vi.mock('../api/CommentsService', () => ({
  commentsService: {
    getCommentsByPostId: vi.fn(),
  },
}));

vi.mock('../api/UsersService', () => ({
  usersService: {
    getUserById: vi.fn(),
  },
}));

const MockedPostsListPage = (props: Post) => {
  const navigate = useNavigate();

  return (
    <>
      <PostPreview
        {...props}
        onClick={() => {
          const state = { userId: props.userId };
          navigate('/posts?details=1', { state });
        }}
      />
      <Outlet />
    </>
  );
};

interface FullPostContextState {
  card: FullPostCard | null;
  error: string | null;
  status: LoadingStatuses;
}

const MockedFullPostPage = (props: FullPostContextState) => {
  const MockedPostPage = withQueryParam(PostPage, 'details');

  return (
    <FullPostContext.Provider value={props}>
      <MockedPostPage />
    </FullPostContext.Provider>
  );
};

describe('PostPage component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render the PostPage with the incorrect postId Not Found', async () => {
    const user = userEvent.setup();

    const providedProps = {
      card: mockFullPostCards[0],
      status: LoadingStatuses.Fulfilled,
      error: null,
    };

    render(
      <MemoryRouter initialEntries={['/posts']}>
        <Routes>
          <Route
            path="/posts"
            element={<MockedPostsListPage {...mockPosts[0]} />}
          >
            <Route
              path=""
              element={<MockedFullPostPage {...providedProps} />}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const postTitle = await screen.findByText(
      'His mother had always taught him'
    );
    expect(postTitle).toBeInTheDocument();

    const postPreview = screen.getByText('His mother had always taught him');

    await user.click(postPreview);

    const notFoundTitle = await screen.findByText(`Oops!`);
    expect(notFoundTitle).toBeInTheDocument();
    const notFoundBody = await screen.findByText(`There's an error`);
    expect(notFoundBody).toBeInTheDocument();
  });
});
