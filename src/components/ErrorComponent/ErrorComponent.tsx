import { Component } from 'react';
import style from './ErrorComponent.module.css';

interface ErrorComponentProps {
  info: string | null;
}

class ErrorComponent extends Component<ErrorComponentProps> {
  render() {
    return (
      <div className={style['error-container']}>
        <h2>Oops!</h2>
        <b>There&#39;s an error</b>
        <span>Error: {this.props.info || 'Something went wrong!'}</span>
      </div>
    );
  }
}

export default ErrorComponent;
