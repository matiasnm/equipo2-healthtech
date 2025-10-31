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
      <div className="max-w-3xl mx-auto mb-6">
        <div className={`flex flex-col md:flex-row rounded-xl p-4 gap-6 items-start border border-[var(--color-accent)] shadow-lg bg-white`}
        >
          {/* Left: image */}
          <div className="md:w-1/4 w-full flex justify-center">
            <img
              src={imageUrl}
              alt={name}
              onError={(e: any) => { e.currentTarget.src = '/images/default.webp'; }}
              className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full border-2 border-[var(--color-accent)]"
            />
          </div>

          {/* Middle: info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-[var(--color-text)]">{name}</h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block text-sm bg-[var(--color-accent)] text-white px-2 py-0.5 rounded">{specialty}</span>
                  <span className="text-sm text-[var(--color-muted)]">{education}</span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{experience}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">Matrícula: <strong className="text-[var(--color-text)]">{license}</strong></p>
              </div>

              <div className="hidden md:block text-right">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-semibold"
                  onClick={() => { console.log('openAppointmentModal clicked for practitioner', id); openAppointmentModal(); }}
                >
                  Agendar cita
                </button>

                <div className="mt-3 text-sm text-[var(--color-muted)]">
                  <div>{location}</div>
                </div>
              </div>
            </div>

            {/* Availability badges */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
              <div>
                <div className="text-xs text-[var(--color-muted)]">Días</div>
                <div className="mt-1 flex gap-1 flex-wrap">
                  {allDays.map((day) => (
                    <span key={day} className={`px-2 py-1 text-xs rounded-full ${availableDays.some((d) =>
                      new Date(d).toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '').toLowerCase().startsWith(day.toLowerCase())
                    ) ? 'bg-[var(--color-accent)] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-[var(--color-muted)]">Horarios</div>
                <div className="mt-1 flex gap-1 flex-wrap">
                  {allHours.map((hour) => (
                    <span key={hour} className={`px-2 py-1 text-xs rounded ${availableHours.includes(hour) ? 'bg-[var(--color-accent)] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {hour}:00
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="text-xs text-[var(--color-muted)]">Contacto</div>
                <div className="mt-1 flex items-center gap-3 text-xl text-[var(--color-muted)]">
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
                  {meetsLink && (
                    <a href={meetsLink} target="_blank" rel="noopener noreferrer" title="Cita virtual">
                      <FiVideo className="hover:text-[var(--color-primary)]" />
                    </a>
                  )}
                  {mapsLink && (
                    <a href={mapsLink} target="_blank" rel="noopener noreferrer" title="Cita presencial">
                      <FiMapPin className="hover:text-[var(--color-primary)]" />
                    </a>
                  )}
                  {calendarLink && (
                    <a href={calendarLink} target="_blank" rel="noopener noreferrer" title="Google Calendar">
                      <FaCalendarAlt className="hover:text-[var(--color-primary)]" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile action */}
            <div className="mt-4 md:hidden flex justify-center">
              <button
                type="button"
                className="px-4 py-2 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-semibold w-full"
                onClick={() => { console.log('openAppointmentModal clicked for practitioner', id); openAppointmentModal(); }}
              >
                Agendar cita
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <AppointmentModal
              isOpen={showModal}
              practitioner={modalPractitioner}
              patient={modalPatient}
              metadata={metadata}
              onClose={closeAppointmentModal}
            />
          </div>
        )}
      </div>
    </>
  );
};


