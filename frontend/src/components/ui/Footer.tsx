import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-[var(--color-muted)] text-[var(--color-inverted)] px-4 py-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        
        {/* Logo + redes */}
        <div className="flex items-center gap-6 md:gap-8 w-full md:w-auto">
          <div className="w-16 h-16 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center overflow-hidden">
            <img
              src="/favicon.ico" 
              alt="Logo Healt Tech"
              className="w-15 h-15 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold leading-none">Health Tech</span>
            <span className="text-xs text-[var(--color-inverted)]">Clínica integral</span>
          </div>
          <div className="flex gap-4 text-lg text-[var(--color-inverted)] ml-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
              <FaTwitter className="hover:text-[var(--color-primary)]" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
              <FaYoutube className="hover:text-[var(--color-primary)]" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebook className="hover:text-[var(--color-primary)]" />
            </a>
          </div>
        </div>

        {/* Enlaces */}
        <div className="flex flex-col md:flex-row md:w-[50%] justify-center gap-8 text-sm">
          <div className="flex flex-col gap-1">
            <span className="font-bold uppercase text-[var(--color-inverted)] pb-1">Compañía</span>
            <a href="#nosotros" className="hover:underline">Sobre nosotros</a>
            <a href="#contacto" className="hover:underline">Contacto</a>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-500 my-4" />
      <div className="text-center text-xs">© 2025 Panacea clínica integral – Todos los derechos reservados.</div>
    </footer>
  );
};

