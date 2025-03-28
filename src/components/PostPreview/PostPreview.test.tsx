import { MemoryRouter } from 'react-router';
import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '../../__tests__/setup.ts';
import { PostEntity } from '../../models';
import { renderWithProviders } from '../../utils';
import PostDetailsContainer from '../PostDetailsContainer/PostDetailsContainer.tsx';
import PostsList from '../PostsList/PostsList.tsx';
import SearchQueryContextProvider from '../../context/SearchQueryContext';
import mockData from '../../__mocks__/data.ts';
import PostPreview from './PostPreview.tsx';
import { withQueryParam } from '../../utils';
import { server } from '../../__mocks__/server.ts';

describe('PostPreview', () => {
  const renderComponent = async () => {
    const TestComponent = (props: { details: string }) => {
      return <PostDetailsContainer postId={props.details} />;
    };

    const PostDetails = withQueryParam(TestComponent, 'details');

    renderWithProviders(
      <MemoryRouter>
        <SearchQueryContextProvider>
          <PostsList />
          <PostDetails />
        </SearchQueryContextProvider>
      </MemoryRouter>
    );

    const list = await screen.findAllByRole('listitem');
    const post = list[0];

    return { post };
  };

  it('should render the relevant card data', () => {
    const post = mockData.mockPosts[0];

    renderWithProviders(<PostPreview onClick={vi.fn()} {...post} />);

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

    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', { name: 'Ava Harris' })
        ).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
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

  it('should update selected-posts field in redux store if user selects a post', async () => {
    const post = mockData.mockPosts[1];
    const previousState: PostEntity[] = [];

    const { store } = renderWithProviders(
      <PostPreview onClick={vi.fn()} {...post} />,
      {
        preloadedState: {
          'selected-posts': previousState,
        },
      }
    );

    const checkbox = screen.getByRole('checkbox');

    await userEvent.click(checkbox);

    await waitFor(() => {
      expect(store.getState()['selected-posts']).toEqual([
        mockData.mockPosts[1],
      ]);
    });
  });
});
