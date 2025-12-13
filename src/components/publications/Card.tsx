import React from 'react';

type CardProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return (
    <div className={`bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-black/5 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
