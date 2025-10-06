import React from 'react';
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', size = 'md', children }: ButtonProps) => {
  const base = 'rounded font-semibold transition-colors';
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-800',
    secondary: 'bg-secondary text-primary hover:bg-blue-100',
    accent: 'bg-accent text-white hover:bg-yellow-500',
  };
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return <button className={`${base} ${variants[variant]} ${sizes[size]}`}>{children}</button>;
};
