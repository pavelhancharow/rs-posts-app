import { act } from 'react';
import { MemoryRouter, Routes, Route, Outlet, useNavigate } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, beforeEach, vi, test, it, afterEach } from 'vitest';
import mockData from '../__mocks__/mockData.ts';
import FullPost from '../components/FullPost/FullPost.tsx';
import FullPostContent from '../components/FullPostContent/FullPostContent.tsx';
import FullPostUI from '../components/FullPostUI/FullPostUI.tsx';
import PostPreview from '../components/PostPreview/PostPreview.tsx';
import FullPostContextProvider, {
  FullPostContext,
} from '../context/FullPostContext.tsx';
import { LoadingStatuses } from '../enums';
import { withQueryParam } from '../helpers';
import { FullPostCard, Post } from '../models';

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
  const MockedPostPage = withQueryParam(FullPost, 'details');

  return (
    <FullPostContext.Provider value={props}>
      <FullPostUI>
        <MockedPostPage />
      </FullPostUI>
    </FullPostContext.Provider>
  );
};

describe('Tests for the Detailed Card component (FullPost)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Check that a loading indicator is displayed while fetching data', async () => {
    const MockedFullPostPage = ({ ...props }) => {
      return (
        <FullPostContextProvider postId={'1'}>
          <FullPost {...props} />
        </FullPostContextProvider>
      );
    };

    const providedProps = {
      card: mockFullPostCards[0],
      status: LoadingStatuses.Idle,
      error: null,
    };

    await act(() =>
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
      )
    );

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  test('Make sure the detailed card component correctly displays the detailed card data.', () => {
    render(<FullPostContent {...mockFullPostCards[0]} />);

    expect(
      screen.getByText('His mother had always taught him')
    ).toBeInTheDocument();

    expect(screen.queryByText('Ava Harris')).toBeInTheDocument();
    expect(screen.queryByText('@avahx')).toBeInTheDocument();
    expect(screen.queryByText('view all 2 comments')).toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    const user = userEvent.setup();

    const providedProps = {
      card: mockFullPostCards[0],
      status: LoadingStatuses.Fulfilled,
      error: null,
    };

    await act(async () => {
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
    });

    const postPreview = screen.getByText('His mother had always taught him');

    await user.click(postPreview);

    expect(screen.getByText('Ava Harris')).toBeInTheDocument();

    const closeButton = screen.getByRole('link');
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);

    expect(screen.queryByText('Ava Harris')).not.toBeInTheDocument();
  });
});
