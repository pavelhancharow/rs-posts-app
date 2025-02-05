import { FallbackModel } from '../../models';
import styles from './Fallback.module.css';

type FallbackProps = FallbackModel;

function Fallback(props: FallbackProps) {
  return (
    <section className={styles.fallback}>
      <header>
        <h3>Oops! An error occurred!</h3>
      </header>
      <div className={styles.fallback__content}>
        <p>
          <strong>Error:</strong> {props.error.toString()}
        </p>
        <p>
          <strong>Stacktrace:</strong> {props.componentStack}
        </p>
      </div>
    </section>
  );
}

export default Fallback;
