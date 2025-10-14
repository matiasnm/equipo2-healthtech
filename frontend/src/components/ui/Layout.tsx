import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export const Layout = ({ children, header, footer }: LayoutProps) => {

  return (
    <main className="font-[var(--font-monserrat)]">
  <div className="min-h-screen w-full bg-white relative flex flex-col">
    
    {/* Header 
    {header && <div className="relative z-20">{header}</div>}
    */}

    {/* Contenido principal */}
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 sm:px-8 bg-opacity-90 rounded-xl shadow-md flex-grow">
      {children}
    </div>

    {/* Footer */}
    {footer && <div className="relative z-10">{footer}</div>}
  </div>
</main>

  );
};
