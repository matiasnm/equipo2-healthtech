import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
const HomeNavbar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const IsAuthenticated = useAuthStore(s => s.isAuthenticated);

    const scrollTop = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setOpen(false);
        } else {
            navigate("/");
        }

    };

    const goToServices = () => {
        if (location.pathname === "/") {
            const el = document.getElementById('servicios');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setOpen(false);
        } else {
            navigate({ pathname: '/', hash: '#servicios' });
        }
    };

    return (
        <nav className="sticky top-0 z-30 w-full bg-[var(--color-primary)] text-white/95 shadow">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <button onClick={scrollTop} className="flex items-center gap-3 cursor-pointer">
                    <img src="/favicon.ico" alt="Logo" className="w-8 h-8 rounded-full bg-white" />
                    <span className="text-lg font-bold tracking-tight">Health Tech</span>
                </button>

                <button className="md:hidden hover:cursor-pointer" onClick={() => setOpen(!open)} aria-label="Abrir menú">
                    <span className="sr-only">Abrir menú</span>
                    <div className="w-6 h-6 grid gap-1.5">
                        <span className="block h-0.5 bg-white"></span>
                        <span className="block h-0.5 bg-white"></span>
                        <span className="block h-0.5 bg-white"></span>
                    </div>
                </button>

                <ul className="hidden md:flex items-center gap-6">
                    <li>
                        <button onClick={scrollTop} className="hover:underline hover:cursor-pointer">Inicio</button>
                    </li>
                    <li>
                        {/* Usamos handler para evitar recarga completa y manejar caso misma página */}
                        <button onClick={goToServices} className="hover:underline hover:cursor-pointer">Especialidades</button>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:underline">Contacto</Link>
                    </li>
                    <li>
                        <Link to={ IsAuthenticated ? "/dashboard" : "/login"} className="block py-2 hover:underline">Ingresar al portal</Link>
                    </li>
                </ul>
            </div>

            {open && (
                <ul className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-[var(--color-primary)] text-white">
                    <li>
                        <button onClick={scrollTop} className="block py-2 text-left w-full hover:underline hover:cursor-pointer">Inicio</button>
                    </li>
                    <li>
                        <button onClick={goToServices} className="block py-2 text-left w-full hover:underline hover:cursor-pointer">Nuestros servicios</button>
                    </li>
                    <li>
                        <Link to="/contact" className="block py-2 text-left w-full hover:underline hover:cursor-pointer">Contacto</Link>
                    </li>
                    <li>
                        <Link to={ IsAuthenticated ? "/dashboard" : "/login"} className="block py-2 text-left w-full hover:underline hover:cursor-pointer">Ingresar al portal</Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default HomeNavbar;