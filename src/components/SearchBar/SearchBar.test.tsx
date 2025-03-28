import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { localStorageService } from '../../services';
import { renderWithProviders } from '../../utils';
import SearchBar from './SearchBar.tsx';
import SearchQueryContextProvider from '../../context/SearchQueryContext';
import { userEvent } from '../../__tests__/setup.ts';

describe('SearchBar', () => {
  beforeEach(() => {
    vi.spyOn(localStorageService, 'searchParams', 'get').mockReturnValue({
      skip: 10,
      limit: 50,
      q: 'Hello World!',
    });

    renderWithProviders(
      <MemoryRouter>
        <SearchQueryContextProvider>
          <SearchBar />
        </SearchQueryContextProvider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should retrieve the value from the local storage upon mounting', () => {
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('Hello World!');
  });

  it('should save the entered value to the local storage when user clicks the Search button', async () => {
    const setSpy = vi.spyOn(localStorageService, 'searchParams', 'set');

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Hello World!');

    await userEvent.clear(input);
    await userEvent.type(input, 'John Doe');

    expect(input).toHaveValue('John Doe');

    const button = screen.getByRole('button');

    await userEvent.click(button);

    await waitFor(() => {
      expect(setSpy).toHaveBeenCalledTimes(1);

      expect(setSpy).toHaveBeenCalledWith({
        skip: 0,
        limit: 50,
        q: 'John Doe',
      });
    });
  });
});
