import { useState } from "react";
import { FiPhone, FiMapPin, FiVideo } from "react-icons/fi";
import { FaWhatsapp, FaCalendarAlt } from "react-icons/fa";
import { AppointmentModal } from "./modals/AppointmentModal";
import { useAuthStore } from "../../store/useAuthStore";

export type CustomCardProps = {
  id: number;
  imageUrl: string;
  name: string;
  specialty: string;
  education: string;
  experience: string;
  license: string;
  availableDays: string[];
  availableHours: number[];
  metadata: {
    appointmentChannels: string[];
    appointmentPriority: string[];
    appointmentStatuses: string[];
  };
  phoneNumberLink?: string;
  whatsappLink?: string;
  mapsLink?: string;
  calendarLink?: string;
  meetsLink?: string;
  location?: string;
  onClose?: () => void;
};


export const CustomCard = ({
  id,
  imageUrl,
  name,
  specialty,
  education,
  experience,
  license,
  availableDays,
  availableHours,
  metadata,
  location,
  mapsLink,
  meetsLink,
  whatsappLink,
  phoneNumberLink,
  calendarLink,
  onClose,
}: CustomCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthStore();

  if (!user) return null;

  const allDays = ["Lun", "Mar", "Mié", "Jue", "Vie"];
  const allHours = Array.from({ length: 10 }, (_, i) => i + 8).filter((h) => h !== 12);

  const openAppointmentModal = () => setShowModal(true);
  const closeAppointmentModal = () => setShowModal(false);

  const modalPractitioner = {
    id,
    name,
    specialty,
    availableDays,
    availableHours,
  };

  const modalPatient = {
    id: user.id,
    fullName: user.userProfile?.fullName ?? user.name ?? "Paciente",

  };

  return (
    <>
      <div className="relative w-full md:w-[700px] mx-auto mb-6">
        <div
          className={`flex flex-col md:flex-row rounded-xl p-4 gap-6 items-start border border-[var(--color-accent)] shadow-lg transition-all duration-300 ${showModal ? "backdrop-blur-sm" : "bg-[var(--color-secondary)]/50"
            }`}
        >
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src={imageUrl}
              alt={name}
              className="w-32 h-32 object-cover rounded-full border-2 border-[var(--color-accent)]"
            />
          </div>
          <div className="flex flex-col gap-2 md:w-2/3 w-full">
            <h2 className="text-xl font-bold text-[var(--color-text)]">{name}</h2>
            <p className="text-sm text-[var(--color-muted)]">{specialty}</p>
            <p className="text-sm text-[var(--color-muted)]">Estudios: {education}</p>
            <p className="text-sm text-[var(--color-muted)]">Experiencia: {experience}</p>
            <p className="text-sm text-[var(--color-muted)]">Matrícula: {license}</p>

            <div className="mt-2">
              <span className="text-sm font-semibold text-[var(--color-text)]">Días disponibles:</span>
              <div className="flex gap-2 flex-wrap mt-1">
                {allDays.map((day) => (
                  <span
                    key={day}
                    className={`px-2 py-1 rounded-full text-sm border ${availableDays.some((d) =>
                      new Date(d)
                        .toLocaleDateString("es-AR", { weekday: "short" })
                        .replace(".", "")
                        .toLowerCase()
                        .startsWith(day.toLowerCase())
                    )
                      ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                      : "bg-gray-100 text-gray-400 border-gray-300"
                      }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-2">
              <span className="text-sm font-semibold text-[var(--color-text)]">Horarios disponibles:</span>
              <div className="flex gap-2 flex-wrap mt-1">
                {allHours.map((hour) => (
                  <span
                    key={hour}
                    className={`px-2 py-1 rounded text-sm border ${availableHours.includes(hour)
                      ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                      : "bg-gray-100 text-gray-400 border-gray-300"
                      }`}
                  >
                    {hour}:00
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-semibold"
              onClick={openAppointmentModal}
            >
              Agendar cita
            </button>
          </div>

          <p className="mt-2 text-sm text-center text-[var(--color-muted)]">
            También puedes acercarte a nuestras oficinas para agendar un turno o comunicarte con secretaria
          </p>

          <div className="flex justify-center gap-4 mt-4 text-xl text-[var(--color-muted)]">
            {whatsappLink && (
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <FaWhatsapp className="hover:text-[var(--color-primary)]" />
              </a>
            )}
            {phoneNumberLink && (
              <a href={`tel:${phoneNumberLink}`} title="Llamar al doctor">
                <FiPhone className="hover:text-[var(--color-primary)]" />
              </a>
            )}
            {calendarLink && (
              <a href={calendarLink} target="_blank" rel="noopener noreferrer" title="Google Calendar">
                <FaCalendarAlt className="hover:text-[var(--color-primary)]" />
              </a>
            )}
            {mapsLink && (
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" title="Cita presencial">
                <FiMapPin className="hover:text-[var(--color-primary)]" />
              </a>
            )}
            {meetsLink && (
              <a href={meetsLink} target="_blank" rel="noopener noreferrer" title="Cita virtual">
                <FiVideo className="hover:text-[var(--color-primary)]" />
              </a>
            )}
          </div>

          <div className="mt-2">
            <span className="text-sm font-semibold text-[var(--color-text)]">Horarios disponibles:</span>
            <div className="flex gap-2 flex-wrap mt-1">
              {allHours.map((hour) => (
                <span
                  key={hour}
                  className={`px-2 py-1 rounded text-sm ${availableHours.includes(hour)
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-400"
                    }`}
                >
                  {hour}:00
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-4 text-xl text-[var(--color-muted)]">
            {whatsappLink && (
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <FaWhatsapp className="hover:text-[var(--color-primary)]" />
              </a>
            )}
            {phoneNumberLink && (
              <a href={`tel:${phoneNumberLink}`} title="Llamar al doctor">
                <FiPhone className="hover:text-[var(--color-primary)]" />
              </a>)}
            {calendarLink && (
              <a href={calendarLink} target="_blank" rel="noopener noreferrer" title="Google Calendar">
                <FaCalendarAlt className="hover:text-[var(--color-primary)]" />
              </a>
            )}
            {mapsLink && (
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" title="Cita presencial">
                <FiMapPin className="hover:text-[var(--color-primary)]" />
              </a>
            )}
            {meetsLink && (
              <a href={meetsLink} target="_blank" rel="noopener noreferrer" title="Cita virtual">
                <FiVideo className="hover:text-[var(--color-primary)]" />
              </a>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center">
          <AppointmentModal
            isOpen={showModal}
            practitioner={modalPractitioner}
            patient={modalPatient}
            metadata={metadata}
            onClose={closeAppointmentModal}
          />
        </div>)
      }
    </>


  )
};


