import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`bg-[var(--color-secondary)]/50 border border-[var(--color-accent)] shadow-lg rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

