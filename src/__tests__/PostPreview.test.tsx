import { MemoryRouter, Routes, Route, Outlet, useNavigate } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, beforeEach, vi, test, it, afterEach } from 'vitest';
import { postsService, commentsService, usersService } from '../api';
import mockData from '../__mocks__/mockData.ts';
import FullPost from '../components/FullPost/FullPost.tsx';
import PostPreview from '../components/PostPreview/PostPreview.tsx';
import FullPostContextProvider, {
  FullPostContext,
} from '../context/FullPostContext.tsx';
import { LoadingStatuses } from '../enums';
import { withQueryParam } from '../helpers';
import { FullPostCard, Post } from '../models';

const { mockComments, mockFullPostCards, mockPosts, mockUsers } = mockData;

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

interface FullPostContextState {
  card: FullPostCard | null;
  error: string | null;
  status: LoadingStatuses;
}

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

const MockedFullPostPage = (props: FullPostContextState) => {
  const MockedPostPage = withQueryParam(FullPost, 'details');

  return (
    <FullPostContext.Provider value={props}>
      <MockedPostPage />
    </FullPostContext.Provider>
  );
};

describe('Tests for the Card component (PostPreview)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Ensure that the card component renders the relevant card data', () => {
    render(<PostPreview {...mockPosts[0]} onClick={() => {}} />);

    expect(screen.getByText(mockPosts[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockPosts[0].body)).toBeInTheDocument();

    const tagsText = mockPosts[0].tags.map((tag) => `#${tag}`).join(' ');
    expect(screen.getByText(tagsText)).toBeInTheDocument();

    expect(screen.getByText(`${mockPosts[0].views}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockPosts[0].reactions.likes}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockPosts[0].reactions.dislikes}`)
    ).toBeInTheDocument();
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
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

    expect(screen.queryByText('Ava Harris')).not.toBeInTheDocument();

    const postPreview = screen.getByText('His mother had always taught him');

    await user.click(postPreview);

    const fullPostBody = await screen.findByText(`Ava Harris`);
    expect(fullPostBody).toBeInTheDocument();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const user = userEvent.setup();
    const mockFetchCommentsByPostId = vi.spyOn(
      commentsService,
      'getCommentsByPostId'
    );
    mockFetchCommentsByPostId.mockResolvedValue({
      total: 2,
      skip: 0,
      limit: 25,
      comments: [mockComments[0]],
    });

    const mockFetchUserById = vi.spyOn(usersService, 'getUserById');
    mockFetchUserById.mockResolvedValue({ ...mockUsers[0] });

    const mockFetchPostById = vi.spyOn(postsService, 'getPostById');
    mockFetchPostById.mockResolvedValue({ ...mockPosts[0] });

    const MockedFullPostPage = () => {
      const MockedPostPage = withQueryParam(FullPost, 'details');

      return (
        <FullPostContextProvider postId="1">
          <MockedPostPage />
        </FullPostContextProvider>
      );
    };

    render(
      <MemoryRouter initialEntries={['/posts']}>
        <Routes>
          <Route
            path="/posts"
            element={<MockedPostsListPage {...mockPosts[0]} />}
          >
            <Route path="" element={<MockedFullPostPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const postPreview = screen.getByText('His mother had always taught him');

    await user.click(postPreview);

    await waitFor(() => {
      expect(mockFetchPostById).toHaveBeenCalledTimes(1);
      expect(mockFetchCommentsByPostId).toHaveBeenCalledTimes(1);
      expect(mockFetchUserById).toHaveBeenCalledTimes(1);
    });

    const userName = await screen.findByText('@avahx');
    expect(userName).toBeInTheDocument();

    const totalComments = await screen.findByText('view all 2 comments');
    expect(totalComments).toBeInTheDocument();
  });
});
