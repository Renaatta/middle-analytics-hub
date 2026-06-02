import { create } from 'zustand';

interface AppState {
  brandName: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setBrandName: (name: string) => void;
}

// create создает хук, который мы сможем вызывать в любом компоненте
export const useAppStore = create<AppState>((set) => ({
  // Начальное состояние (State)
  brandName: 'Enterprise Analytics HUB',
  theme: 'light',

  // Мутации (Actions)
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setBrandName: (name) => set({ brandName: name }),
}));