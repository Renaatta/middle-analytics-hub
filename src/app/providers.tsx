'use client'; // Указываем Next.js, что это клиентский слой

import React, { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/core/api/queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
  // Инициализируем клиент внутри useState, чтобы он создавался один раз на сессию в браузере
  const [queryClient] = useState(() => createQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
