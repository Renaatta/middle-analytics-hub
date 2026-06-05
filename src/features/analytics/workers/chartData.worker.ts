// Этот код будет выполняться в ИЗОЛИРОВАННОМ потоке процессора

self.onmessage = function (event: MessageEvent<number>) {
  // Получаем количество точек из главного потока
  const pointsCount = event.data; 
  
  const startTime = performance.now();
  const data = new Float32Array(pointsCount); // Используем типизированный массив для максимальной скорости

  // Тяжелая математика
  for (let i = 0; i < pointsCount; i++) {
    data[i] = Math.sin(i * 0.05) * 40 + Math.cos(i * 0.01) * 20 + 100;
  }

  const endTime = performance.now();
  const timeTaken = endTime - startTime;

  // Отправляем данные И время выполнения обратно в главный поток
  self.postMessage({ data, timeTaken });
};

// Чтобы TypeScript не ругался на изолированный файл без экспортов
export {};