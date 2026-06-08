import { describe, test, expect, vi } from 'vitest';
import { withPerformanceLogger } from './hof';

describe('HOF: withPerformanceLogger', () => {
  test('должен успешно вызывать оригинальную функцию и возвращать её результат', () => {
    // Создаем шпиона (mock-функцию), которая просто умножает число на 2
    const originalFn = vi.fn((num: number) => num * 2);
    
    // Оборачиваем её в наш HOF
    const wrappedFn = withPerformanceLogger('TestOperation', originalFn);
    
    // Вызываем обернутую функцию
    const result = wrappedFn(5);
    
    // Проверяем:
    expect(originalFn).toHaveBeenCalledTimes(1); // Оригинальная функция вызвалась 1 раз
    expect(originalFn).toHaveBeenCalledWith(5);  // Туда передался аргумент 5
    expect(result).toBe(10);                     // Результат равен 10
  });
});