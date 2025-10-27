import React from 'react';
import { Clock, Award, ShieldCheck } from 'lucide-react';

const StatCard: React.FC<{ icon: React.ReactNode; title: string; subtitle: string }>
  = ({ icon, title, subtitle }) => (
  <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--color-secondary)] text-[var(--color-text)]">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-[var(--color-text)]">{title}</h3>
      <p className="text-sm text-[var(--color-text)]/70">{subtitle}</p>
    </div>
  </div>
);

const InfoStats: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <StatCard icon={<Clock />} title="24 horas de servicio" subtitle="Guardia y turnos disponibles todo el día" />
        <StatCard icon={<Award />} title="10 años de experiencia" subtitle="Trayectoria y excelencia comprobada" />
        <StatCard icon={<ShieldCheck />} title="High Quality Care" subtitle="Protocolos y estándares internacionales" />
      </div>
    </section>
  );
};

export default InfoStats;