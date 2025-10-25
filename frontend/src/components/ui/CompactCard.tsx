interface CompactCardProps {
  imageUrl: string;
  name: string;
  specialty: string;
  onClick?: () => void;
}

export const CompactCard = ({
  imageUrl,
  name,
  specialty,
  onClick,
}: CompactCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-lg shadow-md bg-white w-full max-w-md mx-auto text-left hover:shadow-lg transition-shadow border border-[var(--color-accent)] mb-4 animate-cloud"
    >
      <img
        src={imageUrl}
        alt={`Foto de ${name}`}
        className="w-16 h-16 object-cover rounded-full border-2 border-[var(--color-accent)]"
      />
      <div className="flex flex-col flex-grow">
        <h3 className="text-base font-bold text-[var(--color-text)]">{name}</h3>
        <p className="text-sm text-[var(--color-muted)]">{specialty}</p>
      </div>
    </button>
  );
};




