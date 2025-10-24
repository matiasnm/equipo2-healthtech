import { useEffect } from "react";
import HomeNavbar from "../components/home/HomeNavbar";
import { Footer } from "../components/ui";
import { Phone, PhoneCall, Headset, MapPin } from "lucide-react";

const Contact = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    return (
        <>
            <HomeNavbar />
            <main className="bg-white">
                {/* Header */}
                <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">Contacto</h1>
                    <p className="mt-3 text-[var(--color-text)]/80 max-w-2xl">Estamos para ayudarte. Llamanos ante emergencias, consultas, turnos o atención al cliente.</p>
                </section>

                {/* Teléfonos */}
                <section className="max-w-6xl mx-auto px-4 pb-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <PhoneCall className="text-[var(--color-error)]" />
                            <h3 className="font-semibold text-[var(--color-text)]">Emergencias 24/7</h3>
                        </div>
                        <a href="tel:08001234567" className="mt-2 inline-block text-lg font-bold text-[var(--color-text)] hover:underline">0800-123-4567</a>
                        <p className="text-xs text-[var(--color-text)]/60">Guardia y atención inmediata</p>
                    </div>

                    <div className="p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Headset className="text-[var(--color-primary)]" />
                            <h3 className="font-semibold text-[var(--color-text)]">Atención al cliente</h3>
                        </div>
                        <a href="tel:08103456789" className="mt-2 inline-block text-lg font-bold text-[var(--color-text)] hover:underline">0810-345-6789</a>
                        <p className="text-xs text-[var(--color-text)]/60">Consultas generales y soporte</p>
                    </div>

                    <div className="p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Phone className="text-[var(--color-primary)]" />
                            <h3 className="font-semibold text-[var(--color-text)]">Turnos</h3>
                        </div>
                        <a href="tel:01145678900" className="mt-2 inline-block text-lg font-bold text-[var(--color-text)] hover:underline">(011) 4567-8900</a>
                        <p className="text-xs text-[var(--color-text)]/60">Reserva, cambios y cancelaciones</p>
                    </div>

                    <div className="p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Headset className="text-[var(--color-primary)]" />
                            <h3 className="font-semibold text-[var(--color-text)]">Obras sociales</h3>
                        </div>
                        <a href="tel:01141234567" className="mt-2 inline-block text-lg font-bold text-[var(--color-text)] hover:underline">(011) 4123-4567</a>
                        <p className="text-xs text-[var(--color-text)]/60">Convenios y autorizaciones</p>
                    </div>
                </section>

                {/* Ubicación */}
                <section id="contacto" className="bg-[var(--color-secondary)]/30">
                    <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid lg:grid-cols-2 gap-8 items-start">
                        <div>
                            <div className="flex items-center gap-3">
                                <MapPin className="text-[var(--color-primary)]" />
                                <h2 className="text-2xl font-semibold text-[var(--color-text)]">Ubicación</h2>
                            </div>
                            <p className="mt-2 text-[var(--color-text)]/80">Av. Salud 123, Ciudad, País</p>
                            <p className="text-[var(--color-text)]/60 text-sm">Lun a Vie 8:00–20:00 • Sáb 9:00–13:00</p>
                            <a href="https://maps.google.com/?q=Av.+Salud+123" target="_blank" rel="noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]">Abrir en Google Maps</a>
                        </div>
                        <div className="w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow">
                            <iframe
                                title="Ubicación Health Tech"
                                src="https://www.google.com/maps?q=Av.+Salud+123&output=embed"
                                className="w-full h-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};


export default Contact;

