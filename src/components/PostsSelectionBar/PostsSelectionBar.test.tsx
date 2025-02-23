import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect } from 'vitest';
import { userEvent } from '../../__tests__/setup.ts';
import { renderWithProviders } from '../../utils';
import PostsSelectionBar from './PostsSelectionBar.tsx';
import mockData from '../../__mocks__/data.ts';

describe('PostsSelectionBar', () => {
  beforeEach(() => {
    renderWithProviders(
      <MemoryRouter>
        <PostsSelectionBar />
      </MemoryRouter>,
      {
        preloadedState: {
          'selected-posts': mockData.mockPosts,
        },
      }
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render content if store has selected posts list', () => {
    const content = screen.getByText(/2/i);
    const buttons = screen.getAllByRole('button');

    expect(content).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });

  it('should remove selected posts list from store and unmount PostsSelectionBar if user clicks unselect all', async () => {
    const button = screen.getByText(/unselect/i);

    await userEvent.click(button);

    await waitFor(() => {
      expect(button).not.toBeInTheDocument();
    });
  });

  it('should download selected posts list if user clicks download button', async () => {
    const spyNavError = vi.spyOn(console, 'error').mockImplementation(vi.fn());
    const button = screen.getByText(/download/i);
    const anchor = screen.getByRole('link');

    expect(anchor).toBeInTheDocument();

    const clickSpy = vi.spyOn(anchor, 'click');

    await userEvent.click(button);

    expect(anchor).toHaveAttribute('download', expect.stringMatching(/.csv/i));

    await waitFor(() => {
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(anchor).toHaveAttribute('href', '#');

      expect(spyNavError).toHaveBeenCalledWith(
        expect.stringMatching(/Error: Not implemented: navigation/i),
        undefined
      );
    });

    clickSpy.mockRestore();
  });
});
