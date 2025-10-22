import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
} 

export const Layout = ({ children, header, footer }: LayoutProps) => {
  return (
    <main className="font-[var(--font-monserrat)] min-h-screen w-full bg-sunset-gradient flex flex-col">
      <div className="min-h-screen w-full relative bg-white/20 backdrop-blur-md flex flex-col">
        
        {header && <div className="relative z-20 w-full">{header}</div>}

        <div className="relative z-10 w-full px-0 py-0 flex-grow">

          {children}
        </div>
        {footer && <div className="relative z-20 w-full">{footer}</div>}
      </div>
    </main>
  );
};
