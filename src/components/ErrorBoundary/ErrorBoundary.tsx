import { Component, ComponentType, ErrorInfo, ReactNode } from 'react';
import { FallbackProps } from '../../models';

interface ErrorBoundaryProps {
  FallbackComponent: ComponentType<FallbackProps>;
  children: ReactNode;
}

interface ErrorBoundaryState extends Partial<FallbackProps> {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, { componentStack }: ErrorInfo): void {
    componentStack ??= 'ErrorBoundary';

    this.setState((state) => ({ ...state, error, componentStack }));
    console.error(error, componentStack);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.FallbackComponent;

      return (
        <FallbackComponent
          error={this.state.error ?? new Error('Something went wrong!')}
          componentStack={this.state.componentStack ?? 'ErrorBoundary'}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
