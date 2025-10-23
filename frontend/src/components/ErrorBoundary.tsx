import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary atrapó un error:", error, errorInfo);
    
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback ?? (
        <div className="p-6 bg-red-50 border border-red-300 rounded text-red-800">
          <h2 className="text-lg font-bold mb-2">Algo salió mal.</h2>
          <pre className="text-sm whitespace-pre-wrap">{error?.message}</pre>
        </div>
      );
    }

    return children;
  }
}
