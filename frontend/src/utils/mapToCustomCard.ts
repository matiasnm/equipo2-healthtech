import type { PractitionerSummary } from "../schemas/practitioner.schema";
import type { CustomCardProps } from "../components/ui/CustomCard";
import type { ClinicMetadata } from "../services/metadata";

type Availability = {
  days: string[];
  hours: number[];
};

export const mapToCustomCardProps = (
  p: PractitionerSummary,
  availability: Availability,
  metadata: ClinicMetadata
): CustomCardProps => {
  const clinic = metadata.clinic;

  return {
    id: p.id,
    imageUrl: p.userProfile.photoUrl ?? "/images/default.jpg",
    name: p.userProfile.fullName,
    specialty: p.practitionerRole.specialityCode.display,
    education: p.practitionerProfile.studies?.trim() || "No especificado",
    experience:
      typeof p.practitionerProfile.experience === "number"
        ? `${p.practitionerProfile.experience} años`
        : "Sin datos",
    license: p.practitionerProfile.officeCode ?? "No disponible",
    availableDays: availability.days,
    availableHours: availability.hours,
    metadata: {
      appointmentChannels: metadata.appointmentChannels ?? [],
      appointmentPriority: metadata.appointmentPriority ?? [],
      appointmentStatuses: metadata.appointmentStatuses ?? [],
    },
    phoneNumberLink: clinic.secretaryPhone ?? clinic.administrationPhone ?? "",
    whatsappLink: clinic.secretaryPhone
      ? `https://wa.me/${clinic.secretaryPhone}`
      : undefined,
    mapsLink: clinic.address
      ? `https://maps.google.com/?q=${encodeURIComponent(
          `${clinic.address}, ${clinic.province ?? ""}, ${clinic.country ?? ""}`
        )}`
      : undefined,
  };
};
