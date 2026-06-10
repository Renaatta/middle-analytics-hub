import { use } from 'react';
import { SecurityContext } from '@/shared/context/SecurityContext';

interface SecretWidgetProps {
  isLocked: boolean;
}

export function SecretDataWidget({ isLocked }: SecretWidgetProps) {
  // 1. Если виджет открыт для всех, мы просто отдаем публичные данные
  if (!isLocked) {
    return <div>🔓 Публичные данные: Доступно всем без авторизации.</div>;
  }

  // 2. МАГИЯ REACT 19: Вызываем хук use() внутри условия!
  // Со старым useContext тут была бы ошибка: "Hooks can only be called inside the body of a function component..."
  const security = use(SecurityContext);

  if (!security) {
    return <div>❌ Ошибка: SecurityContext не найден!</div>;
  }

  // 3. Проверяем роль из контекста
  if (security.role !== 'admin') {
    return <div>🔒 Доступ ограничен. Требуется роль ADMIN (Ваша роль: {security.role}).</div>;
  }

  return (
    <div style={{ padding: '1rem', background: '#f0fdf4', border: '1px solid #16a34a' }}>
      👑 <strong>Секретные Enterprise-метрики:</strong> Выручка за сегодня +450,000$ (Token:{' '}
      {security.userToken})
    </div>
  );
}
