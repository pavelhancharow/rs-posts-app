import { MemoryRouter } from 'react-router';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../utils';
import FullPost from './FullPost.tsx';

describe('FullPost', () => {
  it('should display a loading indicator while fetching data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <FullPost postId="1" />
      </MemoryRouter>
    );

    const loader = screen.getByRole('progressbar');

    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });
  });
});
