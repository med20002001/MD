import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ 
  variant = 'primary', 
  onClick, 
  children, 
  className = '' 
}: ButtonProps) {
  const baseStyles = 'px-6 py-2 rounded font-medium transition-colors';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
