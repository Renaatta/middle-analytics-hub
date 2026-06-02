import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Обновляем состояние, чтобы следующий рендер показал запасной UI
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Здесь в реальных проектах логируют ошибку в Sentry / Logrocket
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.fallback || (
          <div
            style={{
              padding: '1rem',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              background: '#fef2f2',
              color: '#b91c1c',
            }}
          >
            <strong>⚠️ Что-то пошло не так</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
              Не удалось загрузить этот виджет.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
