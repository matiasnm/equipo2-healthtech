import React from 'react';

type Specialist = {
  id: number;
  name: string;
  specialty: string;
  photo: string;
  bio: string;
};

const specialists: Specialist[] = [

  { id: 1, name: 'Dra. Ana López', specialty: 'Cardiología', photo: 'https://img.mbst.com.ar/panfamanager/health/doctors/ana-lopez.png', bio: 'Experta en cardiopatías y prevención.' },
  { id: 2, name: 'Dr. Martín Pérez', specialty: 'Neurología', photo: 'https://img.mbst.com.ar/panfamanager/health/doctors/martin-perez.png', bio: 'Neuro diagnóstico avanzado.' },
  { id: 3, name: 'Dra. Sofía Ruiz', specialty: 'Dermatología', photo: 'https://img.mbst.com.ar/panfamanager/health/doctors/sofia-ruiz.png', bio: 'Cuidado integral de la piel.' },
  { id: 4, name: 'Dr. Juan García', specialty: 'Pediatría', photo: 'https://img.mbst.com.ar/panfamanager/health/doctors/juan-garcia.png', bio: 'Atención pediátrica humana.' },
  { id: 5, name: 'Dra. Paula Méndez', specialty: 'Ginecología', photo: 'https://img.mbst.com.ar/panfamanager/health/doctors/paula-mendez.png', bio: 'Salud integral de la mujer.' },

];

const TopSpecialistsCarousel: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">Top especialistas</h2>
          <p className="text-[var(--color-text)]/70">Profesionales destacados por experiencia y calidez.</p>
        </header>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
            {specialists.map((s) => (
              <article key={s.id} className="min-w-[260px] max-w-[260px] snap-start bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <img src={s.photo} alt={s.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">{s.name}</h3>
                  <p className="text-sm text-[var(--color-primary)] font-medium">{s.specialty}</p>
                  <p className="text-sm text-[var(--color-text)]/70 mt-2">{s.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSpecialistsCarousel;