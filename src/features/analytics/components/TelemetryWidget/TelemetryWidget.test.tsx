import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

import { TelemetryWidget } from './TelemetryWidget';
import { ErrorBoundary } from '../../../../shared/ui/ErrorBoundary/ErrorBoundary';

describe('Интеграция TelemetryWidget и ErrorBoundary', () => {
  const criticalLog = { id: 103, title: 'CRITICAL: Worker Timeout', status: 'CRITICAL' };

  // 1. Глушим console.error перед каждым тестом, чтобы терминал оставался чистым
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  // 2. Восстанавливаем консоль после каждого теста
  afterEach(() => {
    vi.restoreAllMocks();
    // ВАЖНО: Очищаем виртуальный DOM после каждого теста!
    cleanup();
  });

  test('Рендерит виджет нормально, когда пропс bug равен false', () => {
    render(
      <ErrorBoundary>
        <TelemetryWidget log={criticalLog} bug={false} />
      </ErrorBoundary>
    );

    // Проверяем, что текст ошибки на экране ЕСТЬ
    expect(screen.getByText('CRITICAL: Worker Timeout')).toBeInTheDocument();
  });

  test('ErrorBoundary ловит падение виджета, когда bug равен true', () => {
    // В зависимости от того, как написан твой ErrorBoundary,
    // ты можешь передать ему fallback UI, либо он покажет встроенный текст (например "Что-то пошло не так").
    // Для этого теста представим, что он принимает fallback:
    render(
      <ErrorBoundary
        fallback={<div data-testid="error-fallback">Виджет сломан, но дашборд жив!</div>}
      >
        <TelemetryWidget log={criticalLog} bug={true} />
      </ErrorBoundary>
    );

    // ВАЖНО: Используем queryByText (а не getByText), если ожидаем, что элемента НЕТ на экране.
    // getByText выбросит ошибку и сломает тест, если не найдет текст.
    expect(screen.queryByText('CRITICAL: Worker Timeout')).not.toBeInTheDocument();

    // Проверяем, что на экране появился интерфейс заглушки от ErrorBoundary
    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
  });
});
