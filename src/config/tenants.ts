import { Tenant } from '@/shared/store/tenantStore';

export interface TenantConfig {
  brandName: string;
  supportEmail: string;
  features: {
    enableCanvasChart: boolean;
    enableExport: boolean;
  };
}

export const TENANT_CONFIGS: Record<Tenant, TenantConfig> = {
  robotech: {
    brandName: 'RoboTech Industries',
    supportEmail: 'tech@robotech.com',
    features: {
      enableCanvasChart: true, // Доступно всё
      enableExport: true,
    },
  },
  biomed: {
    brandName: 'BioMed Labs',
    supportEmail: 'help@biomed.eco',
    features: {
      enableCanvasChart: false, // Упрощенный интерфейс без тяжелых графиков
      enableExport: true,
    },
  },
  fingarant: {
    brandName: 'FinGarant Security',
    supportEmail: 'secure@fingarant.ru',
    features: {
      enableCanvasChart: true,
      enableExport: false, // Экспорт отключен для безопасности данных
    },
  },
};