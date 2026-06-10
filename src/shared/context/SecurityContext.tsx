import { createContext, ReactNode, useState } from 'react';

export type UserRole = 'admin' | 'viewer';

interface SecurityContextType {
  role: UserRole;
  userToken: string;
}

// Создаем обычный React-контекст
export const SecurityContext = createContext<SecurityContextType | null>(null);

export function SecurityProvider({ children }: { children: ReactNode }) {
  // Имитируем, что залогинился обычный Viewer (для проверки)
  const [security] = useState<SecurityContextType>({
    role: 'admin',
    userToken: 'secret-token-123',
  });

  return <SecurityContext.Provider value={security}>{children}</SecurityContext.Provider>;
}
