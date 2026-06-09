import type { Meta, StoryObj } from '@storybook/nextjs-vite';
// ИМПОРТИРУЕМ ИЗОЛИРОВАННЫЙ ВИДЖЕТ, А НЕ СТРАНИЦУ
import { TelemetryWidget } from '@/features/analytics/components/TelemetryWidget/TelemetryWidget';

const meta: Meta<typeof TelemetryWidget> = {
  title: 'Analytics/TelemetryWidget',
  component: TelemetryWidget,
  tags: ['autodocs'],
  argTypes: {
    bug: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TelemetryWidget>;

export const SuccessState: Story = {
  args: {
    log: { id: 101, title: 'Connection established to DB cluster', status: 'SUCCESS' },
    bug: false,
    mouseCoords: { x: 45, y: 12 },
  },
};

export const CriticalState: Story = {
  args: {
    log: { id: 103, title: 'CRITICAL: Memory leak detected in worker-3', status: 'CRITICAL' },
    bug: false,
    mouseCoords: { x: 120, y: 88 },
  },
};
