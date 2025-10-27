import React from 'react';

type News = {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
};

const news: News[] = [
    { id: 1, title: 'Nueva sala de diagnóstico por imágenes', excerpt: 'Incorporamos equipamiento de última generación para estudios más precisos.', image: 'https://img.mbst.com.ar/panfamanager/health/news/newlestter1.jpg', date: 'Oct 2025' },
    { id: 2, title: 'Campaña de vacunación', excerpt: 'Ampliamos horarios y stock para vacunas estacionales.', image: 'https://img.mbst.com.ar/panfamanager/health/news/newlestter2.webp', date: 'Sep 2025' },
    { id: 3, title: 'Charlas de salud comunitaria', excerpt: 'Ciclos abiertos a la comunidad sobre prevención y hábitos saludables.', image: 'https://img.mbst.com.ar/panfamanager/health/news/newlestter3.jpeg', date: 'Ago 2025' },
];

const NewsSection: React.FC = () => {
    return (
        <section className="bg-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <header className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">Noticias</h2>
                    <p className="text-[var(--color-text)]/70">Novedades y comunicados de nuestra clínica.</p>
                </header>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {news.map(item => (
                        <article key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <time className="text-xs text-[var(--color-text)]/60">{item.date}</time>
                                <h3 className="mt-1 text-lg font-semibold text-[var(--color-text)]">{item.title}</h3>
                                <p className="text-sm text-[var(--color-text)]/70 mt-1">{item.excerpt}</p>
                                <a href="#" className="inline-block mt-3 text-[var(--color-primary)] hover:underline">Leer más</a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;