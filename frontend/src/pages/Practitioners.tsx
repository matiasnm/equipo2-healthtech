import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Layout, Navbar, CompactCard, SpecialtyGrid, CustomCard,} from "../components/ui";
import { specialties } from "../data/specialties";
import { getPractitioners } from "../services/practitioners";
import { getClinicMetadata, type ClinicMetadata } from "../services/metadata";
import { useActiveSection } from "../hooks/useActiveSection";
import { mapToCustomCardProps } from "../utils/mapToCustomCard";
import { AppointmentModal } from "../components/ui/modals/AppointmentModal";
import { getPractitionerWeeklyAvailability } from "../services/appointments";
import { useAuthStore } from "../store/useAuthStore";
import { getAvailableSlots } from "../utils/getAvailableSlot";
import type { PractitionerSummary } from "../schemas/practitioner.schema";



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
  const [selectedPractitioner, setSelectedPractitioner] = useState<PractitionerSummary | null>(null);
  const [metadata, setMetadata] = useState<ClinicMetadata | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [availability, setAvailability] = useState<{ days: string[]; hours: number[] }>({ days: [], hours: [] });

  const { user } = useAuthStore();
  const sectionIds = specialties.map((s) => s.code);
  useActiveSection(sectionIds);

  const customCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getPractitioners()
      .then(setPractitioners)
      .catch((err) => console.error("Error al obtener practitioners:", err));

    getClinicMetadata()
      .then(setMetadata)
      .catch((err) => console.error("Error al obtener metadata:", err));
  }, []);

  const handleSelect = async (p: PractitionerSummary) => {
    setSelectedPractitioner(p);
    console.log("Seleccionado:", p.id);
    console.log("Código de especialidad:", p.practitionerRole.specialityCode.code, p.practitionerRole.specialityCode.display);

    try {
      const occupied = await getPractitionerWeeklyAvailability(p.id);
      console.log("Bloques ocupados:", occupied);

      const today = new Date();
      const fullDays = Array.from({ length: 5 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() + i);
        return d.toISOString().split("T")[0];
      });

      const workingHours = Object.fromEntries(
        fullDays.map((day) => [day, { start: "08:00", end: "17:00" }])
      );

      const availableMap = getAvailableSlots(occupied, workingHours, 60);

      const availableDays = Object.keys(availableMap).filter(
        (d) => Array.isArray(availableMap[d]) && availableMap[d].length > 0
      );

      const availableHours = Array.from(
        new Set(
          availableDays.flatMap((day) =>
            (availableMap?.[day] ?? [])
              .filter((h): h is string => typeof h === "string" && h.includes(":"))
              .map((h) => {
  if (typeof h === "string" && h.includes(":")) {
    const [hour] = h.split(":");
    return hour !== undefined ? parseInt(hour, 10) : null;
  }
  return null;
})
.filter((h): h is number => typeof h === "number" && !isNaN(h))

              .filter((h): h is number => typeof h === "number" && !isNaN(h))
          )
        )
      ).sort((a, b) => a - b);

      console.log("Días disponibles:", availableDays);
      console.log("Horas disponibles:", availableHours);

      setAvailability({ days: availableDays, hours: availableHours });

      setTimeout(() => {
        requestAnimationFrame(() => {
          customCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }, 100);
    } catch (err) {
      console.error("Error al obtener disponibilidad semanal:", err);
      setAvailability({ days: [], hours: [] });
    }
  };

  const propsParaCard = selectedPractitioner && metadata && user
    ? mapToCustomCardProps(
        selectedPractitioner,
        availability,
        metadata
      )
    : null;

  if (propsParaCard) {
    console.log("Props para CustomCard:", propsParaCard);
  }

  return (
    <Layout>
      <Navbar />

      {/* Carrusel visual */}
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        <Slider {...carouselSettings}>
          {specialties.map((spec) => (
            <div key={spec.code} className="relative w-full h-full">
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

      {/* SpecialtyGrid visual */}
      <section className="mb-8 px-4 bg-[var(--color-muted)]">
        <h2 className="text-center text-3xl font-semibold text-white py-8">
          Especialidades
        </h2>
        <SpecialtyGrid />
      </section>

      {/* Todos los doctores */}
      <section className="mb-10 px-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Todos los profesionales disponibles
        </h2>

        {practitioners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practitioners.map((p) => (
              <div
                key={p.id}
                className="transition-all duration-300 transform hover:scale-[1.03] animate-cloud"
              >
                <CompactCard
                  imageUrl={p.userProfile.photoUrl ?? "/images/default.webp"}
                  name={p.userProfile.fullName}
                  specialty={p.practitionerRole.specialityCode.display}
                  onClick={() => handleSelect(p)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-muted)] text-center">
            Actualmente no hay profesionales disponibles.
          </p>
        )}
      </section>

      {/* CustomCard inline con scroll */}
      {propsParaCard && (
        <section className="mb-10 px-4" ref={customCardRef}>
          <CustomCard {...propsParaCard} onClose={() => setSelectedPractitioner(null)} />
        </section>
      )}

      {/* Modal de agendamiento */}
      {showAppointmentModal && selectedPractitioner && user && metadata && (
        <AppointmentModal
          isOpen={showAppointmentModal}
          onClose={() => setShowAppointmentModal(false)}
          practitioner={{
            id: selectedPractitioner.id,
            name: selectedPractitioner.userProfile.fullName,
            specialty: selectedPractitioner.practitionerRole.specialityCode.display,
            availableDays: availability.days,
            availableHours: availability.hours,
          }}
          patient={{
            id: user.id,
            fullName: user.userProfile?.fullName ?? user.name ?? "Paciente sin nombre",
          }}
          metadata={metadata}
        />
      )}
    </Layout>
  );
};

export default PractitionersPage;

