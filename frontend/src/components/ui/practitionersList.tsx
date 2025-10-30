import { useState } from "react";
import { usePractitioners } from "../../hooks/usePractitioners";
import { specialties } from "../../data/specialties";
import { PractitionerCard } from "./PractitionerCard";
import { CustomCard } from "./CustomCard";
import { Loading } from "./Loading";
import { slugify } from "../../utils/slugify";
import { PractitionerSummary } from "../../types/practitioner.types";

export const PractitionersList = () => {
  const { data = [], isLoading } = usePractitioners();

  const transformed: {
    id: number;
    name: string;
    title: string;
    email: string;
    specialty: string;
    imageUrl?: string;
  }[] = data.map((p) => ({
    id: p.id,
    name: p.practitionerProfile.fullName,
    title: p.practitionerRole.roleCode.display,
    email: p.practitionerProfile.phone,
    specialty: p.practitionerRole.specialityCode.display,
  }));

  if (isLoading) {
    return (
      <section className="px-4 py-6">
        <Loading />
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">Profesionales</h1>

      {specialties.map((spec) => {
        const filtered = transformed.filter((p) => p.specialty === spec.name);
        if (filtered.length === 0) return null;

        return (
          <section key={spec.name} id={slugify(spec.name)} className="scroll-mt-20 mb-10">
            <h2 className="text-2xl font-bold mb-4">{spec.name}</h2>
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
              {filtered.map((p) => (
                <PractitionerCard key={p.id} {...p} />
              ))}
            </div>
          </section>
        );
      })}
    </section>
  );
};


