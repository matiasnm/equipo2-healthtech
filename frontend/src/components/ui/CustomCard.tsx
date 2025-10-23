import { FiPhone, FiMapPin, FiVideo } from "react-icons/fi";
import { FaWhatsapp, FaCalendarAlt } from "react-icons/fa";

interface CustomCardProps {
  variant?: "default" | "bordered" | "highlighted";
  imageUrl: string;
  name: string;
  specialty: string;
  education: string;
  experience: string;
  license: string;
  availableDays: string[];
  availableHours: number[];
  location?: string;
  mapsLink?: string;
  meetsLink?: string;
  phoneNumberLink?: string;
  whatsappLink?: string;
  calendarLink?: string;
  onClose?: () => void;
}
 
export const CustomCard = ({
  variant = "default",
  imageUrl,
  name,
  specialty,
  education,
  experience,
  license,
  availableDays,
  availableHours,
  location,
  mapsLink,
  meetsLink,
  whatsappLink,
  phoneNumberLink,
  calendarLink,
}: CustomCardProps) => {
  const allDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const allHours = Array.from({ length: 11 }, (_, i) => i + 8);

  const variants = {
    default: "bg-[var(--color-secondary)]/50 border border-[var(--color-accent)] shadow-lg",
    bordered: "bg-[var(--color-primary)]/30 border border-[var(--color-accent)] shadow-lg",
    highlighted: "bg-[var(--color-accent)]/10 border border-[var(--color-accent)] shadow-lg",
  };

  return (
    <div className={`flex flex-col md:flex-row rounded-xl p-4 gap-6 items-start w-full md:w-[700px] mx-auto mb-6 ${variants[variant]}`}>
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
                className={`px-2 py-1 rounded-full text-sm ${
                  availableDays.includes(day)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-400"
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
                className={`px-2 py-1 rounded text-sm ${
                  availableHours.includes(hour)
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
  );
};




