import { ReactNode } from 'react';
import { ButtonTypes } from '../../enums';

interface CustomButtonProps {
  type?: ButtonTypes;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: ButtonStyle;
}

type ButtonStyle = 'primary' | 'danger';

function CustomButton({
  type = ButtonTypes.Button,
  disabled = false,
  style = 'primary',
  ...props
}: CustomButtonProps) {
  return (
    <button
      type={type}
      onClick={props.onClick}
      disabled={disabled}
      data-style={style}
      role="button"
    >
      {props.children}
    </button>
  );
}

export default CustomButton;
