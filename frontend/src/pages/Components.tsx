import { Button, Input, CompactCard, Navbar, Footer, MFAModal, Layout, CustomCard, Card, SpecialtyGrid } from '../components/ui/index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export const Components = () => {
  const [showModal, setShowModal] = useState(false);
 
  const triggerToasts = () => {
    toast.success('✅ Éxito: operación completada');
    toast.error('❌ Error: algo salió mal');
    toast.info('ℹ️ Info: este es un mensaje informativo');
    toast.warning('⚠️ Advertencia: revisá los datos');
  };

  return (
    <>
      <Navbar />
      <Layout footer={<Footer />}>
        <h1 className="text-2xl font-bold mb-6">Galería de Componentes UI</h1>

        {/* Buttons */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Botones</h2>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </section>

        {/* Inputs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Inputs</h2>
          <Input label="Email" placeholder="ejemplo@correo.com" />
        </section>

        {/* Cards */}

                {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CompactCard
            imageUrl="/images/panacea.jpg"
            name="Dra. Panacea"
            specialty="Neumonología"
          />
          <CompactCard
            imageUrl="/images/panacea.jpg"
            name="Dra. Panacea"
            specialty="Neumonología"
          />
          <CompactCard
            imageUrl="/images/panacea.jpg"
            name="Dra. Panacea"
            specialty="Neumonología"
          />
          <CompactCard
            imageUrl="/images/panacea.jpg"
            name="Dra. Panacea"
            specialty="Neumonología"
          />
        </div>

        <CustomCard
            variant="default"
            imageUrl="/images/panacea.jpg"
            name="Dra. Panacea"
            specialty="Neumonología"
            education="Universidad Nacional de Cuyo"
            experience="12 años"
            license="MP 12345"
            availableDays={["Lun", "Mar", "Jue"]}
            availableHours={[9, 10, 11, 14, 15, 16]}
            phoneNumberLink="+5492611234567"
            location="Pichincha 1890, C1245 Cdad. Autónoma de Buenos Aires"
            mapsLink="https://maps.app.goo.gl/xJGLFu1GYbDZNh8GA"
            whatsappLink="https://wa.me/5492611234567"
            meetsLink="https://meet.google.com/abc-defg-hij"
            calendarLink="https://calendar.google.com/calendar/u/0/r/eventedit"
            />

        <CustomCard
            variant="bordered"
            imageUrl="/images/rafael.jpg"
            name="Dr. Rafael"
            specialty="Cardiología"
            education="Universidad de Buenos Aires"
            experience="20 años"
            license="MP 67890"
            availableDays={["Mié", "Vie"]}
            availableHours={[8, 9, 10, 17, 18]}
            location="Pichincha 1890, C1245 Cdad. Autónoma de Buenos Aires"
            phoneNumberLink="+5492611234567"
            mapsLink="https://maps.app.goo.gl/xJGLFu1GYbDZNh8GA"
            whatsappLink="https://wa.me/5492611234567"
            meetsLink="https://meet.google.com/abc-defg-hij"
            calendarLink="https://calendar.google.com/calendar/u/0/r/eventedit"
            />

        <CustomCard
            variant="highlighted"
            imageUrl="/images/aurora.jpg"
            name="Dra. Aurora"
            specialty="Pediatría"
            education="Universidad de Córdoba"
            experience="8 años"
            license="MP 11223"
            availableDays={["Lun", "Mié", "Vie"]}
            availableHours={[10, 11, 12, 15, 16]}
            location="Pichincha 1890, C1245 Cdad. Autónoma de Buenos Aires"
            phoneNumberLink="+5492611234567"
            mapsLink="https://maps.app.goo.gl/xJGLFu1GYbDZNh8GA"
            whatsappLink="https://wa.me/5492611234567"
            meetsLink="https://meet.google.com/abc-defg-hij"
            calendarLink="https://calendar.google.com/calendar/u/0/r/eventedit"
            />

        {/* Specialty Grid */}
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Especialidades</h2>
            <SpecialtyGrid />
            </section>

        {/* Toasts */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Toasts</h2>
          <Button variant="accent" onClick={triggerToasts}>
            Probar toasts
          </Button>
          <ToastContainer position="top-right" autoClose={3000} />
        </section>


        {/* Modal MFA */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Modal MFA</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Abrir MFA Modal
          </Button>
          {showModal && <MFAModal onClose={() => setShowModal(false)} />}
        </section>
      </Layout>
    </>
  );
};

export default Components;