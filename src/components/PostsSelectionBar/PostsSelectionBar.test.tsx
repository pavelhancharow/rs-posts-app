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
});
