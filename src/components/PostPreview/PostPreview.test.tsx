import { MemoryRouter } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils';
import PostsList from '../PostsList/PostsList.tsx';
import PostsListContextProvider from '../../context/PostsListContext.tsx';
import PostPage from '../../pages/PostPage.tsx';
import mockData from '../../__mocks__/data.ts';
import PostPreview from './PostPreview.tsx';
import { withQueryParam } from '../../helpers';
import { server } from '../../__mocks__/server.ts';

describe('PostPreview', () => {
  const renderComponent = async () => {
    const FullPostPage = withQueryParam(PostPage, 'details');

    renderWithProviders(
      <MemoryRouter>
        <PostsListContextProvider>
          <PostsList />
          <FullPostPage />
        </PostsListContextProvider>
      </MemoryRouter>
    );

    const list = await screen.findAllByRole('listitem');
    const post = list[0];

    return { post };
  };

  it('should render the relevant card data', () => {
    const post = mockData.mockPosts[0];

    render(<PostPreview onClick={vi.fn()} {...post} />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.body)).toBeInTheDocument();
    expect(screen.getByText(post.views)).toBeInTheDocument();
    expect(screen.getByText(post.reactions.likes)).toBeInTheDocument();
    expect(screen.getByText(post.reactions.dislikes)).toBeInTheDocument();
  });

  it('should open a detailed card component when user clicks on a card', async () => {
    const { post } = await renderComponent();

    expect(
      screen.queryByRole('heading', { name: 'Ava Harris' })
    ).not.toBeInTheDocument();

    await userEvent.click(post);

    expect(post).toBeEnabled();

    expect(await screen.findByRole('progressbar')).toBeEnabled();

    expect(
      await screen.findByRole('heading', { name: 'Ava Harris' })
    ).toBeInTheDocument();
  });

  it('should trigger an additional API call to fetch detailed information when user clicks on a card', async () => {
    const requestListener = vi.fn();
    server.events.on('request:start', requestListener);

    const { post } = await renderComponent();

    await userEvent.click(post);

    await waitFor(() => {
      expect(requestListener).toHaveBeenCalledWith(
        expect.objectContaining({
          request: expect.objectContaining({
            url: expect.stringMatching(/dummyjson\.com\/comments\/post\/\d+/),
            method: 'GET',
          }),
        })
      );

      expect(requestListener).toHaveBeenCalledWith(
        expect.objectContaining({
          request: expect.objectContaining({
            url: expect.stringMatching(/dummyjson\.com\/posts\/\d+/),
            method: 'GET',
          }),
        })
      );

      expect(requestListener).toHaveBeenCalledWith(
        expect.objectContaining({
          request: expect.objectContaining({
            url: expect.stringMatching(/dummyjson\.com\/users\/\d+/),
            method: 'GET',
          }),
        })
      );
    });
  });
});
