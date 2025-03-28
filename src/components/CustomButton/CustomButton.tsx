import { Component, ReactNode } from 'react';
import { ButtonTypes } from '../../enums';

interface CustomButtonProps {
  type: ButtonTypes;
  children: ReactNode;
  onClick?: () => void;
  disabled: boolean;
}

class CustomButton extends Component<CustomButtonProps> {
  static defaultProps: {
    type: ButtonTypes.Button;
    disabled: false;
  };

  render() {
    return (
      <button
        type={this.props.type}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default CustomButton;
