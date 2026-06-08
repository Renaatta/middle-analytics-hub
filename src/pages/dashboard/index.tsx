import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';

import { useAppStore } from '@/features/analytics/store/useAppStore';
import { withAuth } from '@/features/analytics/hoc/withAuth'; // Импортируем HOC

import { TelemetryWidget } from '@/features/analytics/components/TelemetryWidget/TelemetryWidget';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary';
import { MouseTracker } from '@/shared/ui/MouseTracker/MouseTracker'; // Импортируем Render Props

import styles from './styles.module.css';

async function fetchDashboardLogs() {
  return [
    { id: 101, title: 'Connection established to DB cluster', status: 'SUCCESS' },
    { id: 102, title: 'Telemetry sync completed successfully', status: 'SUCCESS' },
    { id: 103, title: 'CRITICAL: Memory leak detected in worker-3', status: 'CRITICAL' },
  ];
}

// НАСТОЯЩИЙ DYNAMIC IMPORT
// Мы передаем анонимную стрелочную функцию, которая вызывает import().
// Next.js вынесет этот файл в отдельный JS-чанк.
const LazyCanvasChart = dynamic(() => import('@/features/analytics/components/HeavyCanvasChart'), {
  ssr: false, // Canvas не работает на сервере, там нет DOM
  loading: () => (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        background: '#f3f4f6',
        borderRadius: '8px',
        animation: 'pulse 2s infinite',
      }}
    >
      ⏳ Скачивание тяжелого модуля графиков по сети...
    </div>
  ),
});

function DashboardCore() {
  const theme = useAppStore((state) => state.theme);
  const brandName = useAppStore((state) => state.brandName);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  const [shouldCrash, setShouldCrash] = useState(false);

  const { data: logs, isLoading } = useQuery({
    queryKey: ['dashboardLogs'],
    queryFn: fetchDashboardLogs,
  });

  return (
    <div className={styles.dashboardRoot} data-theme={theme}>
      <header className={styles.header}>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-text)', margin: 0 }}>
            White-Label System
          </p>
          <h1 style={{ margin: 0 }}>{brandName}</h1>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* Кнопка сброса сессии (чтобы протестировать HOC заново) */}
          <button
            onClick={() => {
              localStorage.removeItem('user_session_token');
              window.location.reload();
            }}
            style={{
              padding: '0.5rem 1rem',
              background: '#374151',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Logout Securely
          </button>

          <button
            onClick={() => setShouldCrash(true)}
            style={{
              padding: '0.5rem 1rem',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Сломать виджет
          </button>
          <button onClick={toggleTheme} className={styles.themeButton}>
            Mode: {theme.toUpperCase()}
          </button>
        </div>
      </header>

      <main>
        <h2>System Telemetry Control Panel</h2>
        {isLoading && <p>Connecting to data stream...</p>}

        {/* Наш ленивый тяжелый график */}
        <div style={{ marginBottom: '2rem' }}>
          <LazyCanvasChart />
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Левая широкая колонка */}
          <div style={{ flex: '1 1 60%', minWidth: '460px' }}>
            <h3>Широкая секция (Компонент в линию)</h3>
            {logs?.map((log) => (
              <ErrorBoundary key={log.id}>
                {/* ПРИМЕНЯЕМ RENDER PROPS: оборачиваем виджет в трекер мыши */}
                <MouseTracker>
                  {(mouse) => <TelemetryWidget log={log} bug={false} mouseCoords={mouse} />}
                </MouseTracker>
              </ErrorBoundary>
            ))}
          </div>

          {/* Правая узкая колонка */}
          <div style={{ flex: '1 1 25%', minWidth: '280px' }}>
            <h3>Узкая секция (Тот же компонент сам перестроился!)</h3>
            {logs?.map((log) => (
              <ErrorBoundary key={log.id}>
                <MouseTracker>
                  {(mouse) => <TelemetryWidget log={log} bug={shouldCrash} mouseCoords={mouse} />}
                </MouseTracker>
              </ErrorBoundary>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// 1. Оборачиваем наше ядро в HOC авторизации
const AuthenticatedDashboard = withAuth(DashboardCore);

// 2. Экспортируем через динамический импорт без SSR
export default dynamic(() => Promise.resolve(AuthenticatedDashboard), {
  ssr: false,
  loading: () => (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>Loading UI Engine...</div>
  ),
});
