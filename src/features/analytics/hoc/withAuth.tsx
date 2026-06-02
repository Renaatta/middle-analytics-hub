import React, { useState, useEffect } from 'react';

// Это HOC. Функция принимает оборачиваемый компонент (WrappedComponent)
export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Имитируем проверку токена в localStorage или сессии бэкенда
      const timer = setTimeout(() => {
        const token = localStorage.getItem('user_session_token');
        if (token === 'active_middle_user') {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      }, 800); // Небольшая задержка для реализма

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return (
        <div style={{ padding: '3rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
          🔒 Security Gateway: Verifying credentials...
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div
          style={{
            padding: '3rem',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            background: '#fef2f2',
            color: '#b91c1c',
            minHeight: '100vh',
          }}
        >
          <h2>🛑 Access Denied</h2>
          <p>You do not have active clearance to view this high-load dashboard.</p>
          <button
            onClick={() => {
              localStorage.setItem('user_session_token', 'active_middle_user');
              window.location.reload(); // Перезагружаем, чтобы HOC перепроверил стейт
            }}
            style={{
              padding: '0.6rem 1.2rem',
              background: '#b91c1c',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Simulate Secure Login
          </button>
        </div>
      );
    }

    // Если всё ок, возвращаем наш компонент со всеми его пропсами
    return <WrappedComponent {...props} />;
  };
}
