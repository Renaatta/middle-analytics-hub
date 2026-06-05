import { useEffect, useRef } from 'react';
import { withPerformanceLogger } from '@/shared/utils/hof'; // Наш HOF!

// Функция генерации "г грязных" данных
function generateRawData(pointsCount: number) {
  const data = [];
  for (let i = 0; i < pointsCount; i++) {
    // Намеренно делаем математику чуть сложнее, чтобы нагрузить CPU
    const value = Math.sin(i * 0.05) * 40 + Math.cos(i * 0.01) * 20 + 100;
    data.push(value);
  }
  return data;
}

// ПРИМЕНЯЕМ HOF: Оборачиваем функцию генерации в наш логгер
const generateDataWithLog = withPerformanceLogger('Генерация 50k точек', generateRawData);

// Обрати внимание: это экспорт по умолчанию, это важно для next/dynamic!
export default function HeavyCanvasChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Генерируем данные (заблокирует основной поток на долю секунды)
    const pointsCount = 50000;
    const data = generateDataWithLog(pointsCount);

    // 2. Отрисовка на Canvas
    const width = canvas.width;
    const height = canvas.height;

    // Очищаем холст
    ctx.clearRect(0, 0, width, height);

    // Рисуем сетку
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Рисуем сам график (50 000 точек)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    const stepX = width / pointsCount;

    // Перебираем массив и ставим точки
    for (let i = 0; i < pointsCount; i++) {
      const x = i * stepX;
      // Инвертируем Y, так как в Canvas координата Y идет сверху вниз
      const y = height - data[i];

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke(); // Даем команду отрисовать линию
  }, []);

  return (
    <div
      style={{ padding: '1rem', background: '#fff', borderRadius: '8px', border: '1px solid #ccc' }}
    >
      <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>Canvas Render: 50,000 Nodes</h3>
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        style={{ width: '100%', height: 'auto', display: 'block', background: '#f9fafb' }}
      />
    </div>
  );
}
