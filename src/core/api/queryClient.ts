import { QueryClient } from '@tanstack/react-query';

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Отключаем лишние апдейты при смене вкладок
        staleTime: 1000 * 60 * 5,    // Данные считаются свежими 5 минут
        retry: 1,                    // В случае ошибки делаем только 1 повторный запрос
      },
    },
  });