
import { Component, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Ocurrió un error inesperado. Por favor, recargá la página.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
