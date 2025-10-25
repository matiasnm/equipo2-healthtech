import { slugify } from "../../utils/slugify";

interface SpecialtyCardProps {
  name: string;
  imageUrl: string;
  icon?: React.ReactNode;
  gradientClass: string;
  linkTo: string;
}

export const SpecialtyCard = ({
  name,
  imageUrl,
  icon,
  gradientClass,
  linkTo,
}: SpecialtyCardProps) => {
  return (
    
    <a
      href={linkTo}
      className="group relative rounded-xl overflow-hidden shadow-md hover:scale-[1.03] transition-transform duration-300 ease-in-out animate-cloud"
    >
      {/* Fondo degradado */}
      <div className={`absolute inset-0 ${gradientClass}`} />

      {/* Imagen superpuesta */} 
      <img
        src={imageUrl}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-40 p-4 text-white text-center">
        {icon && <div className="text-4xl mb-2">{icon}</div>}
        <h3 className="text-lg font-semibold drop-shadow">{name}</h3>
      </div>
    </a>
  );
};


