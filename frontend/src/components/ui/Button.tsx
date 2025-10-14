interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  type = 'button',
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
}: ButtonProps) => {
  const base = 'rounded-lg font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 font-[var(--font-monserrat)]';
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-primary)]',
    secondary: 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)] focus:ring-[var(--color-secondary)] ',
    accent: 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] focus:ring-[var(--color-accent)]',
    danger: 'bg-[var(--color-error)] text-white hover:bg-[var(--color-error-hover)] focus:ring-[var(--color-error)] ',
  };
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};

