import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createQueryClient } from '@/core/api/queryClient';
import { PricingList } from './_components/PricingList';

// Включаем ISR (Incremental Static Regeneration)
// Страница кэшируется на сервере, но будет пересобираться в фоне не чаще раза в 30 секунд
export const revalidate = 30;

// Имитируем запрос к бэкенду/CMS
async function getPricingPlans() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
  if (!res.ok) throw new Error('Failed to fetch pricing');
  return res.json();
}

export default async function PricingPage() {
  const queryClient = createQueryClient();

  // Предзагружаем данные прямо на сервере
  await queryClient.prefetchQuery({
    queryKey: ['pricingPlans'],
    queryFn: getPricingPlans,
  });

  return (
    // Сериализуем серверный кэш и передаем его вниз клиентским компонентам
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div
        style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}
      >
        <header style={{ marginBottom: '2rem' }}>
          <span
            style={{
              background: '#e0f2fe',
              color: '#0369a1',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
            }}
          >
            Режим: App Router + ISR
          </span>
          <h1 style={{ marginTop: '1rem' }}>Тарифные планы платформы</h1>
          <p style={{ color: '#666' }}>
            Данные запрашиваются на сервере. Обновление кэша в фоне раз в 30 сек.
          </p>
        </header>

        {/* Наш клиентский список, который мгновенно подхватит данные */}
        <PricingList />
      </div>
    </HydrationBoundary>
  );
}
