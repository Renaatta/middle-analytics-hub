import { create } from 'zustand';

export type Tenant = 'robotech' | 'biomed' | 'fingarant';

interface TenantState {
  tenant: Tenant;
  setTenant: (tenant: Tenant) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  tenant: 'robotech', // Клиент по умолчанию
  setTenant: (tenant) => {
    // Магия White-label: при смене клиента вешаем дата-атрибут на тег <html>
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-tenant', tenant);
    }
    set({ tenant });
  },
}));