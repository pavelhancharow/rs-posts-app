import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import PaginationSelect from './PaginationSelect.tsx';
import PostsListContextProvider from '../../context/PostsListContext.tsx';
import { userEvent } from '../../__tests__/setup.ts';

describe('PaginationSelect', () => {
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
          <PaginationSelect disabled={false} />
        </PostsListContextProvider>

        <LocationDisplay />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update URL query parameter when limit change', async () => {
    const url = screen.getByTestId('location-display');
    const select = screen.getByRole('select');

    expect(url).toHaveTextContent('?perPage=25&page=1');

    await userEvent.selectOptions(select, '50');

    await waitFor(async () => {
      expect(url).toHaveTextContent(/perPage=50&page=1/i);
    });
  });
});
