import { MemoryRouter, useLocation } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import PaginationButtons from './PaginationButtons.tsx';
import PostsListContextProvider from '../../context/PostsListContext.tsx';
import { userEvent } from '../../__tests__/setup.ts';

describe('PaginationButtons', () => {
  beforeEach(() => {
    const mockNavigate = vi.fn();

    vi.mock('react-router-dom', () => ({
      ...vi.importActual('react-router-dom'),
      useNavigate: vi.fn(() => mockNavigate),
    }));

    const LocationDisplay = () => {
      const location = useLocation();

      return <div data-testid="location-display">{location.search}</div>;
    };

    render(
      <MemoryRouter initialEntries={['/?perPage=25&page=1']}>
        <PostsListContextProvider>
          <PaginationButtons total={150} disabled={false} />
        </PostsListContextProvider>

        <LocationDisplay />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('it updates URL query parameter and active status when page changes', async () => {
    const url = screen.getByTestId('location-display');
    expect(url).toHaveTextContent('?perPage=25&page=1');

    const currentPage = screen.getByRole('button', { name: /1/i });
    expect(currentPage).toHaveAttribute('data-active', 'true');

    const nextPage = screen.getByRole('button', { name: /3/i });
    expect(nextPage).toHaveAttribute('data-active', 'false');

    await userEvent.click(nextPage);

    await waitFor(async () => {
      expect(url).toHaveTextContent(/perPage=25&page=3/i);
      expect(currentPage).toHaveAttribute('data-active', 'false');
      expect(nextPage).toHaveAttribute('data-active', 'true');
    });
  });
});
