import { Component } from 'react';
import { FallbackProps } from '../../models';
import styles from './Fallback.module.css';

class Fallback extends Component<FallbackProps> {
  render() {
    return (
      <section className={styles.fallback}>
        <header>
          <h3>Oops! An error occurred!</h3>
        </header>
        <div className={styles.fallback__content}>
          <p>
            <strong>Error:</strong> {this.props.error.toString()}
          </p>
          <p>
            <strong>Stacktrace:</strong> {this.props.componentStack}
          </p>
        </div>
      </section>
    );
  }
}

export default Fallback;
