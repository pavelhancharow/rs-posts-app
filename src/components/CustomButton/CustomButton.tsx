import { ReactNode } from 'react';
import { ButtonTypes } from '../../enums';

interface CustomButtonProps {
  type?: ButtonTypes;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function CustomButton({
  type = ButtonTypes.Button,
  disabled = false,
  ...props
}: CustomButtonProps) {
  return (
    <button type={type} onClick={props.onClick} disabled={disabled}>
      {props.children}
    </button>
  );
}

export default CustomButton;
