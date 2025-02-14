import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { userEvent } from '../../__tests__/setup.ts';
import { ThemeTypes } from '../../enums';
import { localStorageService } from '../../services';
import { renderWithProviders } from '../../utils';
import ThemeContextProvider from '../../context/ThemeContext.tsx';
import ThemeButton from './ThemeButton.tsx';

describe('SearchBar', () => {
  beforeEach(() => {
    vi.spyOn(localStorageService, 'usersTheme', 'get').mockReturnValue(
      ThemeTypes.Dark
    );

    const root = document.createElement('div');

    renderWithProviders(
      <MemoryRouter>
        <ThemeContextProvider root={root}>
          <ThemeButton />
        </ThemeContextProvider>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should retrieve the value from the local storage upon mounting', () => {
    const input = screen.getByRole('checkbox');

    expect(input).toBeChecked();
  });

  it('should update the value in the local storage when user clicks switch theme button', async () => {
    const setSpy = vi.spyOn(localStorageService, 'usersTheme', 'set');

    const input = screen.getByRole('checkbox');
    expect(input).toBeChecked();

    await userEvent.click(input);

    await waitFor(() => {
      screen.debug();
      expect(input).not.toBeChecked();
      expect(setSpy).toHaveBeenCalledTimes(1);
      expect(setSpy).toHaveBeenCalledWith(ThemeTypes.Light);
    });
  });
});
