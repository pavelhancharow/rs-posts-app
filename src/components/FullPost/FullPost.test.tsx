import { MemoryRouter } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import FullPost from './FullPost.tsx';
import FullPostContextProvider from '../../context/FullPostContext.tsx';

describe('FullPost', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter>
        <FullPostContextProvider postId="1">
          <FullPost />
        </FullPostContextProvider>
      </MemoryRouter>
    );

    const loader = screen.getByRole('progressbar');

    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });
  });
});
