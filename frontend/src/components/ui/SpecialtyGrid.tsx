import { specialties } from "../../data/specialties";
import { SpecialtyCard } from "./SpecialtyCard";

export const SpecialtyGrid = () => {
  return (
    <div className="grid gap-6 px-4 py-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
      {specialties.map((spec) => (
        <SpecialtyCard key={spec.name} {...spec} />
      ))}
    </div>
  );
};



