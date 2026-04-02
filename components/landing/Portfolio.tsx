'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollArrow from './ScrollArrow';

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

const projects = [
    {
        number: '01',
        name: 'HMS',
        subtitle: 'Sistema de Gestión Hospitalaria',
        description:
            'Plataforma integral para clínicas y consultorios. Expedientes médicos electrónicos, historial de citas, historia clínica, consultas y laboratorios — todo en un solo lugar para que el personal médico se enfoque en lo que importa: sus pacientes.',
        url: 'https://hms.artesanosdigitalescom.com.mx/',
        tags: ['Salud', 'Expedientes', 'Gestión'],
    },
    {
        number: '02',
        name: 'TransPort',
        subtitle: 'Gestión de Transporte y Flotas',
        description:
            'Sistema completo para empresas de transporte de pasajeros. Venta de boletos, gestión de rutas y flota, encomiendas, reportes financieros y control de gastos operativos — diseñado para mantener toda la operación bajo control en tiempo real.',
        url: 'https://transport.artesanosdigitalescom.com.mx/',
        tags: ['Transporte', 'Logística', 'Finanzas'],
    },
    {
        number: '03',
        name: 'PraderaOS',
        subtitle: 'Gestión Urbana Inteligente',
        description:
            'Plataforma para administración de fraccionamientos y desarrollos urbanos. Propiedades, residentes, mantenimiento, cobros, quejas y órdenes de trabajo con visualización en mapa — la herramienta que todo administrador necesita.',
        url: 'https://urban-os.artesanosdigitalescom.com.mx/',
        tags: ['Inmobiliaria', 'Administración', 'Mapas'],
    },
];

export default function Portfolio() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="portfolio" id="portfolio" ref={ref}>
            <motion.div
                className="portfolio-header"
                initial={{ opacity: 0, x: -80 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...slow, delay: 0.1 }}
            >
                <span className="eyebrow">Portafolio</span>
                <h2 className="portfolio-heading serif-display">
                    Nuestro <i>Trabajo</i>
                </h2>
                <p className="portfolio-subtitle">
                    Productos que construimos junto a nuestros clientes. Cada uno nació de una necesidad real y sigue creciendo con quienes lo usan.
                </p>
            </motion.div>
            <div className="portfolio-grid">
                {projects.map((project, i) => (
                    <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-card"
                        key={project.number}
                        initial={{ opacity: 0, y: 80 + i * 20, scale: 0.9 }}
                        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ ...slow, delay: 0.3 + i * 0.25 }}
                    >
                        <div className="portfolio-card-top">
                            <span className="portfolio-number">{project.number}</span>
                            <div className="portfolio-tags">
                                {project.tags.map((tag) => (
                                    <span className="portfolio-tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="portfolio-card-body">
                            <h3 className="portfolio-name serif-display">{project.name}</h3>
                            <span className="portfolio-subtitle-text">{project.subtitle}</span>
                            <p className="portfolio-desc">{project.description}</p>
                        </div>
                        <div className="portfolio-card-footer">
                            <span className="portfolio-link">Ver Proyecto</span>
                            <span className="portfolio-arrow">&rarr;</span>
                        </div>
                    </motion.a>
                ))}
            </div>
            <ScrollArrow to="testimonials" light />
        </section>
    );
}
