import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  test: {
    globals: true,
    // Разделяем тесты на две независимые среды (Рабочие области)
    projects: [
      // 1. Проект для запуска UI-историй Storybook в реальном браузере
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
      // 2. Наш проект для обычных Unit-тестов (HOF, хуки, утилиты)
      {
        name: 'unit',
        test: {
          environment: 'jsdom',
          setupFiles: './vitest.setup.ts',
          include: ['src/**/*.test.ts', 'src/**/*.test.tsx'], // Ищем наши тесты!
        },
      },
    ],
  },
});