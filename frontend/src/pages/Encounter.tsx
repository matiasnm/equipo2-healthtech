import { useEffect, useState } from "react";
import { Layout, Navbar } from "../components/ui";
import { useAppointments } from "../hooks/useAppointments";
import { usePractitioners } from "../hooks/usePractitioners";
import { CompactCard } from "../components/ui/CompactCard";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Encounter() {
  const [activeTab, setActiveTab] = useState<"historial" | "doctores" | "documentos">("historial");
  const [selectedPractitionerId, setSelectedPractitionerId] = useState<number | null>(null);

  const { appointments, fetchAppointments } = useAppointments();
  const {
    data: practitioners = [],
    fetchPractitioners,
    getSpecialty,
  } = usePractitioners();

  useEffect(() => {
    fetchAppointments();
    fetchPractitioners();
  }, []);

  return (
    <Layout>
      <Navbar />
      <div className="w-full min-h-screen p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">Historial de encuentros médicos</h1>

        {/* Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("historial")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "historial"
                ? "bg-[var(--color-accent)] text-white"
                : "bg-white text-[var(--color-primary)]"
            }`}
          >
            Historial
          </button>
          <button
            onClick={() => setActiveTab("doctores")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "doctores"
                ? "bg-[var(--color-accent)] text-white"
                : "bg-white text-[var(--color-primary)]"
            }`}
          >
            Mis doctores
          </button>
          <button
            onClick={() => setActiveTab("documentos")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "documentos"
                ? "bg-[var(--color-accent)] text-white"
                : "bg-white text-[var(--color-primary)]"
            }`}
          >
            Documentos
          </button>
        </div>

        {/* Content */}
        <section className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-md border border-[var(--color-accent)]">
          {activeTab === "historial" && (
            appointments.length === 0 ? (
              <div className="text-sm text-muted italic">No hay encuentros registrados por el momento.</div>
            ) : (
              <ul className="space-y-6">
                {appointments.map((apt) => (
                  <li key={apt.id} className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-[var(--color-primary)]">
                          {apt.patientProfile?.fullName ?? "Paciente"}
                        </div>
                        <div className="text-sm text-muted">
                          {format(new Date(apt.startTime), "PPPPp", { locale: es })}
                        </div>
                        <div className="text-xs text-[var(--color-accent)]">{apt.status}</div>
                      </div>
                      <a
                        href={`/appointments/${apt.id}`}
                        className="text-[var(--color-accent)] hover:underline text-sm"
                      >
                        Ver cita
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}

          {activeTab === "doctores" && (
            practitioners.length === 0 ? (
              <div className="text-sm text-muted italic">No tenés doctores asignados por el momento.</div>
            ) : (
              <ul className="space-y-4">
                {practitioners.map((doc) => (
                  <CompactCard
                    key={doc.id}
                    imageUrl={doc.practitionerProfile.photoUrl ?? "/default-avatar.png"}
                    name={doc.practitionerProfile.fullName}
                    specialty={getSpecialty(doc)}
                    onClick={() => setSelectedPractitionerId(doc.id)}
                  />
                ))}
              </ul>
            )
          )}

          {activeTab === "documentos" && (
            appointments.flatMap((apt) => apt.documents ?? []).length === 0 ? (
              <div className="text-sm text-muted italic">No hay documentos disponibles para descargar.</div>
            ) : (
              <ul className="space-y-4">
                {appointments
                  .flatMap((apt) => apt.documents ?? [])
                  .map((doc) => (
                    <li key={doc.id}>
                      <a
                        href={doc.downloadUrl}
                        download
                        className="text-[var(--color-success)] hover:underline text-sm flex items-center gap-2"
                      >
                        📄 {doc.name}
                      </a>
                    </li>
                  ))}
              </ul>
            )
          )}
        </section>
      </div>
    </Layout>
  );
}




