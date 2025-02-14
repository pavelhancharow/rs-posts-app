import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes, useLocation } from 'react-router';
import { vi } from 'vitest';
import { renderWithProviders } from '../../utils';
import PostDetailsLayout from './PostDetailsLayout.tsx';
import { withQueryParam } from '../../utils';
import { userEvent } from '../../__tests__/setup.ts';

describe('PostDetailsLayout', () => {
  beforeEach(() => {
    const mockNavigate = vi.fn();

    vi.mock('react-router-dom', () => ({
      ...vi.importActual('react-router-dom'),
      useNavigate: vi.fn(() => mockNavigate),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const LocationDisplay = () => {
      const location = useLocation();

      return <div data-testid="location-display">{location.search}</div>;
    };

    const TestComponent = () => {
      return <PostDetailsLayout>Post Details Content</PostDetailsLayout>;
    };

    const PostsList = () => {
      return (
        <>
          <div>Posts List Content</div>
          <Outlet />
        </>
      );
    };

    const FullPost = withQueryParam(TestComponent, 'details');

    renderWithProviders(
      <MemoryRouter initialEntries={['/posts?details=1&perPage=25&page=1']}>
        <Routes>
          <Route path="/posts" element={<PostsList />}>
            <Route path="" element={<FullPost />} />
          </Route>
        </Routes>
        <LocationDisplay />
      </MemoryRouter>
    );

    return {
      button: await screen.findByRole('link'),
      postsListContent: screen.getByText('Posts List Content'),
      postDetailsContent: screen.getByText('Post Details Content'),
      url: screen.getByTestId('location-display'),
    };
  };

  it('should be hidden component when user clicks the close button', async () => {
    const { url, button, postsListContent, postDetailsContent } =
      await renderComponent();

    expect(url).toHaveTextContent('?details=1&perPage=25&page=1');
    expect(postsListContent).toBeInTheDocument();
    expect(postDetailsContent).toBeInTheDocument();

    await userEvent.click(button);

    await waitFor(() => {
      expect(url).toHaveTextContent('perPage=25&page=1');
      expect(button).not.toBeInTheDocument();
      expect(postDetailsContent).not.toBeInTheDocument();
    });
  });
});
