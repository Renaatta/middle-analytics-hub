import { useEffect, useRef, useState } from 'react';

export default function HeavyCanvasChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);

  // Добавляем стейт загрузки, чтобы показать красивый спиннер, пока Воркер считает
  const [isGenerating, setIsGenerating] = useState(true);
  const [renderTime, setRenderTime] = useState<number | null>(null);

  useEffect(() => {
    // 1. Инициализируем Web Worker (современный синтаксис Next.js / ES Modules)
    workerRef.current = new Worker(new URL('../workers/chartData.worker.ts', import.meta.url), {
      type: 'module',
    });

    // 2. Отправляем воркеру задачу (сгенерировать 50 000 точек)
    workerRef.current.postMessage(50000);

    // 3. Слушаем ответ от воркера
    workerRef.current.onmessage = (
      event: MessageEvent<{ data: Float32Array; timeTaken: number }>
    ) => {
      const { data, timeTaken } = event.data;
      setRenderTime(timeTaken);
      setIsGenerating(false);

      // Как только данные готовы, запускаем отрисовку
      drawChart(data);
    };

    // Очистка: если компонент удалится со страницы, мы обязаны "уволить" воркера,
    // иначе он останется висеть в оперативной памяти (Memory Leak)
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // Функция отрисовки (осталась почти такой же)
  const drawChart = (data: Float32Array) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const pointsCount = data.length;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    const stepX = width / pointsCount;

    for (let i = 0; i < pointsCount; i++) {
      const x = i * stepX;
      const y = height - data[i];

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();
  };

  return (
    <div
      style={{
        padding: '1.5rem',
        background: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h3 style={{ margin: 0 }}>Canvas Render: 50,000 Nodes</h3>
        {renderTime && (
          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--success-color)',
              background: '#dcfce7',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
            }}
          >
            Worker Time: {renderTime.toFixed(2)}ms
          </span>
        )}
      </div>

      {isGenerating && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <span
            style={{
              animation: 'pulse 1.5s infinite',
              fontWeight: 'bold',
              color: 'var(--accent-color)',
            }}
          >
            ⚙️ Worker is generating data...
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          background: 'var(--bg-color)',
          borderRadius: '4px',
        }}
      />
    </div>
  );
}
