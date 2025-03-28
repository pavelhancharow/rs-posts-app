import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import Fallback from '../Fallback/Fallback.tsx';
import { userEvent } from '../../__tests__/setup.ts';

describe('ErrorBoundary', () => {
  const renderComponent = () => {
    const TestComponent = () => {
      const [error, setError] = useState(false);

      const handleClick = () => setError(true);

      if (error) throw new Error('Try to catch me!!!');

      return (
        <div>
          <h3>Hello World!</h3>

          <CustomButton onClick={handleClick} style="danger">
            Throw an error
          </CustomButton>
        </div>
      );
    };

    render(
      <div>
        <h2>Important information</h2>
        <ErrorBoundary FallbackComponent={Fallback}>
          <TestComponent />
        </ErrorBoundary>
      </div>
    );

    return {
      heading2: screen.getByRole('heading', { name: /important/i }),
      heading3: screen.getByRole('heading', { name: /hello world/i }),
      button: screen.getByRole('button', { name: /Throw an error/i }),
    };
  };

  it('should render the App without errors', () => {
    const { heading2, heading3, button } = renderComponent();

    expect(heading2).toBeInTheDocument();
    expect(heading3).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should render the App fallback when a component fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { button, heading2, heading3 } = renderComponent();

    expect(screen.queryByText('Try to catch me!!!')).not.toBeInTheDocument();

    await userEvent.click(button);

    expect(heading2).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: /Oops/i })
    ).toBeInTheDocument();
    expect(await screen.findByText(/catch me!/i)).toBeInTheDocument();
    expect(heading3).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
