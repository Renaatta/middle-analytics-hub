// Простая функция, которая имитирует запрос к серверу и возвращает Promise
export function fetchAnalyticsFact(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "💡 Факт дня: 90% всех данных в мире были созданы за последние два года. Наш Canvas-график обрабатывает их часть за миллисекунды!"
      );
    }, 2000); // Имитируем задержку сети в 2 секунды
  });
}