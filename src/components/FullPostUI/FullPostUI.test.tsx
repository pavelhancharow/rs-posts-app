import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes, useLocation } from 'react-router';
import { vi } from 'vitest';
import FullPostUI from './FullPostUI.tsx';
import FullPostContextProvider from '../../context/FullPostContext.tsx';
import { withQueryParam } from '../../helpers';
import { userEvent } from '../../__tests__/setup.ts';

describe('FullPostUI', () => {
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

    const TestComponent = (props: { details: string }) => {
      return (
        <FullPostContextProvider postId={props.details}>
          <FullPostUI>Full Post Card Content</FullPostUI>
        </FullPostContextProvider>
      );
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

    render(
      <MemoryRouter initialEntries={['/posts?details=1&limit=25&skip=0']}>
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
      fullPostCardContent: screen.getByText('Full Post Card Content'),
      url: screen.getByTestId('location-display'),
    };
  };

  it('should be hidden component when user clicks the close button', async () => {
    const { url, button, postsListContent, fullPostCardContent } =
      await renderComponent();

    expect(url).toHaveTextContent('?details=1&limit=25&skip=0');
    expect(postsListContent).toBeInTheDocument();
    expect(fullPostCardContent).toBeInTheDocument();

    await userEvent.click(button);

    await waitFor(() => {
      expect(url).toHaveTextContent('limit=25&skip=0');
      expect(button).not.toBeInTheDocument();
      expect(fullPostCardContent).not.toBeInTheDocument();
    });
  });
});
