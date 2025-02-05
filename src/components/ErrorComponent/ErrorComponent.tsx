import style from './ErrorComponent.module.css';

interface ErrorComponentProps {
  info: string | null;
}

function ErrorComponent(props: ErrorComponentProps) {
  return (
    <div className={style['error-container']}>
      <h2>Oops!</h2>
      <b>There&#39;s an error</b>
      <span>Error: {props.info || 'Something went wrong!'}</span>
    </div>
  );
}

export default ErrorComponent;
