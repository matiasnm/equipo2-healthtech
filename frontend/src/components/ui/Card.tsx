import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-white" />

      <div className="relative bg-[var(--color-secondary)]/80 border border-[var(--color-accent)] shadow-lg backdrop-blur rounded-lg p-6">
        {children}
      </div>
    </div>
  );
};


