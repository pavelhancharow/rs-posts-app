import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('NotFoundPage Tests', () => {
  it('should render the NotFoundPage correctly', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, the page you are looking for does not exist.')
    ).toBeInTheDocument();
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });
});
