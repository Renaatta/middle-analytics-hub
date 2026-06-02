import React, { useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  // Проп children — это функция, которая принимает координаты и возвращает JSX
  children: (position: MousePosition) => React.ReactNode;
}

export const MouseTracker: React.FC<MouseTrackerProps> = ({ children }) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // Получаем координаты относительно текущего блока, а не всего экрана
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: Math.floor(event.clientX - rect.left),
      y: Math.floor(event.clientY - rect.top),
    });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ position: 'relative', width: '100%' }}>
      {/* Вызываем функцию-children и отдаем ей стейт координат */}
      {children(position)}
    </div>
  );
};
