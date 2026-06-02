import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.root} ${className}`}>
      Button Component
      {children}
    </div>
  );
};
