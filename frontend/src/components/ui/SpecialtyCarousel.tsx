import { specialties } from "../../data/specialties";
import { Specialty } from "../../types/specialty.types";

interface Props {
  specialties: Specialty[];
}

export const SpecialtyCarousel = ({ specialties }: Props) => {
  return (
    <section className="w-full py-6 bg-[var(--color-muted)] text-white text-center">
      <h2 className="text-xl font-semibold mb-2">
        Atención personalizada en cada especialidad
      </h2>
      <p className="text-sm mb-4">
        Contamos con profesionales dedicados a tu bienestar integral
      </p>

      <div className="overflow-x-auto flex gap-4 px-4">
        {specialties.map((spec) => (
          <a
            key={spec.name}
            href={spec.linkTo}
            title={spec.name}
            className="flex-shrink-0"
          >
            <img
              src={spec.imageUrl}
              alt={spec.name}
              className="w-40 h-24 object-cover rounded-lg shadow-md"
            />
            <p className="mt-2 text-sm font-medium">{spec.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
};
