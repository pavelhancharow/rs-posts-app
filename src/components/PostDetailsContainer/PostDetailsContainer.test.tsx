import { MemoryRouter } from 'react-router';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../utils';
import PostDetailsContainer from './PostDetailsContainer.tsx';

describe('PostDetailsContainer', () => {
  it('should display a loading indicator while fetching data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <PostDetailsContainer postId="1" />
      </MemoryRouter>
    );

    const loader = screen.getByRole('progressbar');

    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });
  });
});
