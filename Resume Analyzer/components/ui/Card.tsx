
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg ${className}`}>
      {children}
    </div>
  );
};
