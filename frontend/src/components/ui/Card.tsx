import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string; 
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`relative mx-2 rounded-lg overflow-hidden ${className}` }>
      <div className="relative bg-white shadow-lg backdrop-blur rounded-lg p-6">
        {children}
      </div>
    </div>
  );
};


