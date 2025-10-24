import React from 'react';
import { SpecialtyGrid } from "../ui/SpecialtyGrid";

const Departments: React.FC = () => {
  return (
    <section id="servicios" className="bg-[var(--color-muted)] text-[var(--color-inverted)] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Departamentos y especialidades</h2>
          <p className="text-sm md:text-base text-[var(--color-inverted)]/80">
            Conocé nuestras principales áreas de atención.
          </p>
        </header>
        <SpecialtyGrid />
      </div>
    </section>
  );
};

export default Departments;