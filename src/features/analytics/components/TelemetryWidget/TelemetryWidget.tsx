// Предположим, что мы скопировали сюда и стили, либо оставили их как были
import widgetStyles from '@/pages/dashboard/Widget.module.css';

export interface WidgetProps {
  log: { id: number; title: string; status: string };
  bug: boolean;
  mouseCoords?: { x: number; y: number }; // Сделали опциональным для упрощения
}

export function TelemetryWidget({ log, bug, mouseCoords = { x: 0, y: 0 } }: WidgetProps) {
  if (bug && log.status === 'CRITICAL') {
    throw new Error('Симулированный краш виджета телеметрии!');
  }

  return (
    <div className={widgetStyles.widgetContainer}>
      <div className={widgetStyles.widgetCard}>
        <div className={widgetStyles.infoBlock}>
          <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>BEACON #{log.id}</span>
          <strong style={{ margin: '0.25rem 0', display: 'block' }}>{log.title}</strong>
          <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontFamily: 'monospace' }}>
            📊 Cursor Focus: X: {mouseCoords.x}px | Y: {mouseCoords.y}px
          </span>
        </div>
        <span
          className={widgetStyles.statusBadge}
          style={{
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            background: log.status === 'CRITICAL' ? '#fef2f2' : '#f0fdf4',
            color: log.status === 'CRITICAL' ? '#ef4444' : '#22c55e',
          }}
        >
          {log.status}
        </span>
      </div>
    </div>
  );
}
