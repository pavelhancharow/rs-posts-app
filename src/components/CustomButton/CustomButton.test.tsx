import { render, screen } from '@testing-library/react';
import CustomButton from './CustomButton.tsx';
import { ButtonTypes } from '../../enums';

describe('CustomButton', () => {
  it('should render button with config is provided', () => {
    render(
      <CustomButton type={ButtonTypes.Submit} disabled={true} style="danger">
        Throw An Error
      </CustomButton>
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/error/i);
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('data-style', 'danger');
    expect(button).toBeDisabled();
  });

  it('should render button with default config is not provided', () => {
    render(<CustomButton>Click Me</CustomButton>);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/click/i);
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('data-style', 'primary');
  });
});
