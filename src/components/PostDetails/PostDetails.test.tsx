import { render, screen, waitFor } from '@testing-library/react';
import PostDetails from './PostDetails.tsx';
import mockData from '../../__mocks__/data.ts';
import { userEvent } from '../../__tests__/setup.ts';

describe('PostDetails', () => {
  const card = mockData.mockPostDetails;

  it('should display the detailed card data correctly', () => {
    render(<PostDetails {...card} />);

    expect(screen.getByText(card.post.title)).toBeInTheDocument();
    expect(screen.getByText(card.post.body)).toBeInTheDocument();
    expect(screen.getByText(card.post.views)).toBeInTheDocument();
    expect(screen.getByText(card.post.reactions.likes)).toBeInTheDocument();
    expect(screen.getByText(card.post.reactions.dislikes)).toBeInTheDocument();

    const username = new RegExp(card.user.username, 'i');
    const fullname = `${card.user.firstName} ${card.user.lastName}`;
    expect(screen.getByText(fullname)).toBeInTheDocument();
    expect(screen.getByText(username)).toBeInTheDocument();

    expect(screen.getByText(card.totalComments)).toBeInTheDocument();
  });

  it('should display comments when user clicks on a view comments button', async () => {
    render(<PostDetails {...card} />);

    const button = screen.getByText(/view/i);

    await userEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveTextContent(/hide/i);
      expect(screen.getAllByRole('listitem')).toHaveLength(
        card.comments.length
      );
    });
  });
});
