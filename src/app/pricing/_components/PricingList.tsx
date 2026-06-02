'use client';

import { useQuery } from '@tanstack/react-query';

async function getPricingPlans() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
  return res.json();
}

export function PricingList() {
  // Благодаря HydrationBoundary этот хук НЕ будет делать сетевой запрос в браузере при первой загрузке.
  // Он сразу и без задержек возьмет кэш, прилетевший с сервера.
  const { data: plans } = useQuery({
    queryKey: ['pricingPlans'],
    queryFn: getPricingPlans,
  });

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {plans?.map((plan: { id: number; title: string }) => (
        <div
          key={plan.id}
          style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem' }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', textTransform: 'capitalize' }}>
            {plan.title.split(' ').slice(0, 2).join(' ')}
          </h3>
          <p style={{ color: '#4b5563', margin: 0 }}>ID тарифа: {plan.id}</p>
        </div>
      ))}
    </div>
  );
}
