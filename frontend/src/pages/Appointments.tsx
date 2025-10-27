import { useState } from "react";
import { Navbar, Layout } from "../components/ui";
import { AppointmentSidebar } from "../components/appointments/AppointmentSidebar";
import { AppointmentCalendar } from "../components/appointments/AppointmentCalendar";
import AppointmentForm from "../components/appointments/AppointmentForm";

export default function Appointments() {
  const [date, setDate] = useState(new Date());
  const [activePractitionerId, setActivePractitionerId] = useState<number>(1);
  const [showForm, setShowForm] = useState(false);

  return (
    <Layout>
      <Navbar />
      <div className="flex flex-col lg:flex-row w-full min-h-screen p-4 gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 bg-background p-4">
          <AppointmentSidebar
            date={date}
            practitionerId={activePractitionerId}
            onCreate={() => setShowForm(true)}
          />
        </aside>

        {/* Calendario o Formulario */}
        <section className="w-full lg:w-2/3 p-4">
          {showForm ? (
            <AppointmentForm 
              date={date}
              practitionerId={activePractitionerId}
              onClose={() => setShowForm(false)} 
            />
          ) : (
            <AppointmentCalendar
              date={date}
              setDate={setDate}
              practitionerId={activePractitionerId}
            />
          )}
        </section>
      </div>
    </Layout>
  );
}
