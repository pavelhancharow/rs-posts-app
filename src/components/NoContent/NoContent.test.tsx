import { render, screen } from '@testing-library/react';
import { localStorageService } from '../../api';
import NoContent from './NoContent.tsx';

describe('NoContent', () => {
  beforeEach(() => {
    vi.spyOn(localStorageService, 'searchParams', 'get').mockReturnValue({
      skip: 10,
      limit: 50,
      q: 'abracadabra',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display message from props', () => {
    render(<NoContent message={'Lorem ipsum dolor sit amet'} />);

    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
  });

  it('should display message from LS if props absent', () => {
    render(<NoContent />);

    expect(screen.getByText(/abracadabra/i)).toBeInTheDocument();
  });
});
