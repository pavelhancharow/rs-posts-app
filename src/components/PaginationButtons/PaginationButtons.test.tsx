import { MemoryRouter, useLocation } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import SearchQueryContextProvider from '../../context/SearchQueryContext';
import PaginationButtons from './PaginationButtons.tsx';
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
      <MemoryRouter initialEntries={['/posts?perPage=25&page=1']}>
        <SearchQueryContextProvider>
          <PaginationButtons limit={25} skip={0} disabled={false} total={150} />
        </SearchQueryContextProvider>

        <LocationDisplay />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update URL query parameter', async () => {
    const url = screen.getByTestId('location-display');
    expect(url).toHaveTextContent('?perPage=25&page=1');

    const currentPage = screen.getByRole('button', { name: /1/i });
    expect(currentPage).toHaveAttribute('data-active', 'true');

    const nextPage = screen.getByRole('button', { name: /3/i });
    expect(nextPage).toHaveAttribute('data-active', 'false');

    await userEvent.click(nextPage);

    await waitFor(async () => {
      expect(url).toHaveTextContent(/perPage=25&page=3/i);
    });
  });
});
