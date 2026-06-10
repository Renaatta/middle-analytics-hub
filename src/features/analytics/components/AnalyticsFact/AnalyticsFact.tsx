import { use } from 'react';

interface AnalyticsFactProps {
  // Компонент принимает уже запущенный Promise как пропс
  factPromise: Promise<string>;
}

export function AnalyticsFact({ factPromise }: AnalyticsFactProps) {
  // Магия React 19: распаковываем Promise "на лету" без useEffect!
  // Если промис еще не зарезолвился, React сам переключит управление на ближайший <Suspense>
  const fact = use(factPromise);

  return (
    <div
      style={{
        padding: '1rem',
        background: 'var(--brand-surface)',
        border: '1px solid var(--brand-border)',
        borderRadius: 'var(--brand-radius)',
        color: 'var(--brand-text)',
        marginTop: '1rem',
        fontStyle: 'italic',
      }}
    >
      {fact}
    </div>
  );
}
