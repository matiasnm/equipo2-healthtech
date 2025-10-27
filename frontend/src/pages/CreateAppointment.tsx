import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Layout, Navbar, Footer } from "../components/ui";
import { getPractitionerById } from "../services/practitioners";
import { createAppointment } from "../services/appointments";
import type { PractitionerSummary } from "../schemas/practitioner.schema";
import { useAuth } from "../hooks/useAuth";

  const CreateAppointment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    const [practitioner, setPractitioner] = useState<PractitionerSummary | null>(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        if (id) {
          getPractitionerById(Number(id)).then(setPractitioner);
        }
    }, [id]);

    useEffect(() => {
        if (!user) {
          navigate("/login");
        }
    }, [user, navigate]);

    const handleSubmit = async () => {
        if (!user?.id || !startTime || !endTime || !id) return;

        const payload = {
        patientId: Number(user.id),
        practitionerIds: [Number(id)],
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        };

        try {
          await createAppointment(payload);
          alert("Turno creado con éxito");
          navigate("/appointments/confirmation");
        } catch (error) {
          console.error("Error al crear turno:", error);
        }
    };

    return (
      <Layout>
        <Navbar />
          <section className="px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Agendar turno con {practitioner?.practitionerProfile.fullName}</h1>

            <Input
                label="Inicio"
                type="datetime-local"
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Selecciona fecha y hora de inicio"
            />

            <Input
                label="Fin"
                type="datetime-local"
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="Selecciona fecha y hora de fin"
            />

            <button onClick={handleSubmit} className="btn-primary">Confirmar turno</button>
          </section>
        <Footer />
      </Layout>
  );
};

export default CreateAppointment;
