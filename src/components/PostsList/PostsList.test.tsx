import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../utils';
import PostsList from './PostsList.tsx';
import SearchQueryContextProvider from '../../context/SearchQueryContext';
import { server } from '../../__mocks__/server.ts';

describe('PostsList', () => {
  const renderComponent = () => {
    renderWithProviders(
      <MemoryRouter>
        <SearchQueryContextProvider>
          <PostsList />
        </SearchQueryContextProvider>
      </MemoryRouter>
    );

    return {
      loader: screen.getByRole('progressbar'),
    };
  };

  it('should render the specified number of cards', async () => {
    const { loader } = renderComponent();

    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });
    expect(await screen.findAllByRole('listitem')).toHaveLength(2);
  });

  it('should display an appropriate message if no cards are present', async () => {
    server.use(
      http.get('https://dummyjson.com/posts', ({ request }) => {
        const url = new URL(request.url);

        return HttpResponse.json({
          posts: [],
          total: 0,
          skip: url.searchParams.get('skip') || 0,
          limit: url.searchParams.get('limit') || 10,
        });
      })
    );

    const { loader } = renderComponent();

    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
      expect(screen.getByText(/No posts found for your search/i));
    });
  });
});
