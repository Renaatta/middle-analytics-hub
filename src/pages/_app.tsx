import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { createQueryClient } from '@/core/api/queryClient';

import '@/styles/themes.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  // Важно: создаем QueryClient внутри useState, чтобы кэш инициализировался
  // строго один раз при старте приложения в браузере.
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
