import { Footer } from "../components/ui";
import HomeNavbar from "../components/Home/HomeNavbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])
  return (
    <>
      <HomeNavbar />
      <div className="bg-white">
        <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight">Sobre Health Tech</h1>
          <p className="mt-4 text-[var(--color-text)]/80 max-w-3xl text-base md:text-lg">
            Somos una clínica integral dedicada a brindar atención médica de alta calidad, con foco en la
            innovación tecnológica y la calidez humana. Nuestro propósito es mejorar la calidad de vida de
            nuestros pacientes a través de diagnósticos precisos y tratamientos efectivos.
          </p>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-8 md:mt-10 items-start">
            <img
              src="https://img.mbst.com.ar/panfamanager/health/about/clinic.webp"
              alt="Nuestra clínica"
              className="w-full h-56 sm:h-64 md:h-72 lg:h-96 object-cover rounded-xl shadow"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)]">Misión y Visión</h2>
              <ul className="mt-3 list-disc pl-5 text-[var(--color-text)]/80 space-y-2 text-sm md:text-base">
                <li>Misión: Proveer atención integral, segura y oportuna.</li>
                <li>Visión: Ser referentes en salud y tecnología médica en la región.</li>
                <li>Valores: Ética, respeto, innovación y compromiso.</li>
              </ul>
              <Link
                to="/#servicios"
                className="inline-block mt-6 bg-[var(--color-primary)] text-white px-5 py-3 rounded hover:bg-[var(--color-primary-hover)] transition text-sm md:text-base"
              >
                Ver especialidades
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-secondary)]/40">
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-5 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-[var(--color-text)] text-base md:text-lg">Equipo multidisciplinario</h3>
              <p className="text-[var(--color-text)]/70 text-sm md:text-base mt-2">Trabajamos en conjunto para brindar un enfoque integral al paciente.</p>
            </div>
            <div className="p-5 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-[var(--color-text)] text-base md:text-lg">Infraestructura moderna</h3>
              <p className="text-[var(--color-text)]/70 text-sm md:text-base mt-2">Instalaciones confortables y equipamiento de última generación.</p>
            </div>
            <div className="p-5 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-[var(--color-text)] text-base md:text-lg">Atención centrada en el paciente</h3>
              <p className="text-[var(--color-text)]/70 text-sm md:text-base mt-2">Escuchamos, acompañamos y priorizamos tus necesidades.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>

  );
};

export default About;