import React from 'react';
import { Link } from 'react-router-dom';

const HeroClinic: React.FC = () => {
  return (
    <section className="bg-base/40">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] leading-tight">
            Cuidamos tu salud con tecnología y calidez humana
          </h1>
          <p className="mt-4 text-[var(--color-text)]/80">
            Somos una clínica integral comprometida con la excelencia médica y la atención personalizada.
            Turnos ágiles, especialistas de primer nivel y equipamiento de última generación.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#servicios" className="bg-[var(--color-primary)] text-white px-5 py-3 rounded hover:bg-[var(--color-primary-hover)] transition">
              Ver especialidades
            </a>
            <Link to="/about" className="border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-3 rounded hover:bg-[var(--color-primary)] hover:text-white transition">
              Conocenos
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src="/imgs/TECSALUD-20230830-Primera-clinica-Healthec-by-TecSalud-FACHADA-jpg.webp"
            alt="Clínica Health Tech"
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
          />
          <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur rounded-lg shadow p-4">
            <p className="text-sm text-[var(--color-text)]">Atención 24/7 • Guardia • Laboratorio • Imágenes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroClinic;