
import { Practitioner } from "../../data/practitioners";

export const PractitionerCard = ({ name, title, email, imageUrl }: Practitioner) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col items-center text-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-24 h-24 rounded-full object-cover mb-3"
        />
      )}
      <h4 className="text-lg font-semibold">{name}</h4>
      <p className="text-sm text-[var(--color-muted)]">{title}</p>
      <p className="text-sm text-[var(--color-primary)]">{email}</p>
    </div>
  );
};

