import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Layout, Navbar, CompactCard, CustomCard, SpecialtyGrid,} from "../components/ui";
import { specialties } from "../data/specialties";
import { usePractitioners } from "../hooks/usePractitioners";
import type { PractitionerSummary } from "../schemas/practitioner.schema";
import { Specialty } from "../types/specialty.types";
import { getPractitioners } from "../services/practitioners";
import { slugify } from "../utils/slugify";
import { getAvailabilityByPractitioner } from "../services/appointments";
import { mapToCustomCardProps } from "../utils/mapToCustomCard";
import type { CustomCardProps } from "../components/ui/CustomCard";
import { useActiveSection } from "../hooks/useActiveSection";

const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 800,
  autoplay: true,
  autoplaySpeed: 3000,
  fade: false,
  arrows: false,
  pauseOnHover: false,
};

const PractitionersPage = () => {
  const [practitioners, setPractitioners] = useState<PractitionerSummary[]>([]);
  const [selected, setSelected] = useState<PractitionerSummary | null>(null);
  const [customCardData, setCustomCardData] = useState<CustomCardProps | null>(null);

  const sectionIds = specialties.map((s) => slugify(s.name));
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    getPractitioners()
      .then((res) => setPractitioners(res))
      .catch((err) => console.error("Error al obtener practitioners:", err));
  }, []);

  const handleSelect = async (p: PractitionerSummary) => {
  try {
    const availability = await getAvailabilityByPractitioner(p.id);
    const mapped = mapToCustomCardProps(p, availability);
    setCustomCardData(mapped);
  } catch (error) {
    console.error("Error al obtener disponibilidad:", error);
  }
  };

  return (
    <Layout>
      <Navbar />

      {/* Carrusel */}
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        <Slider {...carouselSettings}>
          {specialties.map((spec) => (
            <div key={spec.name} className="relative w-full h-full">
              <img
                src={spec.imageUrl}
                alt={spec.name}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold px-4 text-center">
                  Atención eficiente, personalizada y profesional en {spec.name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* SpecialtyGrid */}
      <section className="mb-8 px-4 bg-[var(--color-muted)]">
        <h2 className="text-center text-3xl font-semibold text-white py-8">Especialidades</h2>
        <SpecialtyGrid />
      </section>

      {/* Secciones por especialidad */}
      {specialties.map((spec: Specialty) => {
        const sectionId = slugify(spec.name);
        const filtered = practitioners.filter(
          (p) => slugify(p.practitionerRole?.specialityCode?.display|| "") === sectionId
        );

        return (
          <section
            key={spec.name}
            id={sectionId}
            className="scroll-mt-20 mb-10 px-4"
          >
            <h2
              className={`text-2xl font-bold mb-4 transition-all text-center text-gray-700 duration-500 ${
                activeSection === sectionId
                  ? "scale-105 text-accent"
                  : "text-[var(--color-text)]"
              }`}
            >
              {spec.name}
            </h2>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <CompactCard
                    key={p.id}
                    imageUrl={p.practitionerProfile.photoUrl ?? "/images/default.jpg"}
                    name={p.practitionerProfile.fullName}
                    specialty={p.practitionerRole.specialityCode.display}
                    onClick={() => handleSelect(p)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--color-muted)]">
                Actualmente no hay profesionales disponibles en esta especialidad. 
                <br/>Pronto incorporaremos especialistas en esta área. ¡Gracias por tu paciencia!
              </p>
            )}
          </section>
        );
      })}

      {/* CustomCard */}
      {customCardData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <CustomCard {...customCardData} onClose={() => setCustomCardData(null)} />
        </div>
      )}

    </Layout>
  );
};

export default PractitionersPage;
