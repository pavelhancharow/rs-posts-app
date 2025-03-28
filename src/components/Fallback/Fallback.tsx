import { FallbackModel } from '../../models';
import style from './Fallback.module.css';

const className = style.fallback.concat(' container');

type FallbackProps = FallbackModel;

function Fallback(props: FallbackProps) {
  return (
    <section className={className}>
      <header>
        <h3>Oops! An error occurred!</h3>
      </header>
      <p>
        <strong>Error:</strong>{' '}
        {props.error?.message?.toString() || 'Unknown error'}
      </p>
      <p>
        <strong>Stacktrace:</strong>{' '}
        {props.componentStack || 'No stacktrace available'}
      </p>
    </section>
  );
}

export default Fallback;
