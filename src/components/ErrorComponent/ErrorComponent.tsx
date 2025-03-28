import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import style from './ErrorComponent.module.css';

interface ErrorComponentProps {
  info?: FetchBaseQueryError | SerializedError;
}

function ErrorComponent(props: ErrorComponentProps) {
  const info = props.info ?? { message: 'Something went wrong!' };

  let message = 'Unknown error';

  if ('data' in info && info.data) {
    message = info.data.toString();
  } else if ('error' in info && info.error) {
    message = info.error;
  } else if ('message' in info && info.message) {
    message = info.message;
  }

  return (
    <div className={style['error-container']}>
      <h2>Oops!</h2>
      <b>There&#39;s an error</b>
      <span>Error: {message}</span>
    </div>
  );
}

export default ErrorComponent;
