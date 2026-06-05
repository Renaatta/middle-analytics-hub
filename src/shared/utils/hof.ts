/**
 * HOF: Принимает имя операции и саму функцию.
 * Возвращает новую функцию, которая делает то же самое, но с замером времени.
 */
export function withPerformanceLogger<T, Args extends any[]>(
  operationName: string,
  fn: (...args: Args) => T
) {
  // Возвращаем новую функцию-обертку
  return function (...args: Args): T {
    const startTime = performance.now();
    
    // Выполняем оригинальную функцию
    const result = fn(...args); 
    
    const endTime = performance.now();
    console.log(`⏱️ [Performance] ${operationName} заняла ${(endTime - startTime).toFixed(2)} мс`);
    
    return result;
  };
}