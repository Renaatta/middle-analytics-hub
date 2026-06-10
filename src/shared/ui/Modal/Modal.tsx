import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Защита от Hydration Mismatch: ждем, пока компонент смонтируется в браузере
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Приятный UX: закрываем по кнопке Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Блокируем скролл страницы, когда модалка открыта
    if (isOpen) document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Возвращаем скролл при закрытии
    };
  }, [isOpen, onClose]);

  // Если мы на сервере или модалка закрыта — ничего не рендерим
  if (!mounted || !isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  // Магия createPortal: (Что рендерим, Куда рендерим)
  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999, // Поверх всего!
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose} // Закрываем при клике на фон
    >
      <div
        style={{
          background: 'var(--brand-surface, #fff)',
          color: 'var(--brand-text, #000)',
          padding: '2rem',
          borderRadius: 'var(--brand-radius, 8px)',
          minWidth: '400px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике по самой модалке
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'inherit',
            }}
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
