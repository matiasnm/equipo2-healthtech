import type { PractitionerSummary } from "../schemas/practitioner.schema";
import type { CustomCardProps } from "../components/ui/CustomCard";

export const mapToCustomCardProps = (
  p: PractitionerSummary,
  availability: { days: string[]; hours: number[] }
): CustomCardProps => ({
  imageUrl: p.practitionerProfile.photoUrl ?? "/images/default.jpg",
  name: p.practitionerProfile.fullName,
  specialty: p.practitionerRole.specialityCode.display,
  education: p.practitionerProfile.education ?? "No especificado",
  experience: p.practitionerProfile.experience
    ? `${p.practitionerProfile.experience} años`
    : "Sin datos",
  license:
    p.practitionerProfile.identifiers.find((i: { type: string; value: string }) => i.type === "NATIONAL_ID")?.value ??
    "No disponible",
  availableDays: availability.days,
  availableHours: availability.hours,
  phoneNumberLink: "tel:+542604123456",
  whatsappLink: "https://wa.me/542604123456",
  mapsLink: "https://maps.google.com/?q=Clínica+HealthTech+San+Rafael",
  calendarLink: `/appointments/create/${p.id}`,
});

