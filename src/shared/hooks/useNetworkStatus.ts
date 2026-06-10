import { useSyncExternalStore } from 'react';

// 1. Функция подписки: React сам передает сюда коллбэк (callback), 
// который нужно вызвать, когда внешние данные изменились.
function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  
  // Возвращаем функцию отписки (cleanup)
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

// 2. Функция получения текущего значения (в браузере)
function getSnapshot() {
  return navigator.onLine;
}

// 3. Функция получения значения на сервере (для SSR в Next.js)
// На сервере Node.js нет объекта navigator, поэтому мы возвращаем дефолтное значение true.
function getServerSnapshot() {
  return true; 
}

export function useNetworkStatus() {
  // uSES принимает 3 аргумента: подписка, snapshot для клиента, snapshot для сервера
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}