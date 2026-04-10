'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ScrollArrow from './ScrollArrow';

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

interface Project {
    number: string;
    name: string;
    subtitle: string;
    shortDescription: string;
    longDescription: string;
    features: string[];
    url: string;
    tags: string[];
    images: string[];
}

const projects: Project[] = [
    {
        number: '01',
        name: 'HMS',
        subtitle: 'Sistema de Gestión Hospitalaria',
        shortDescription:
            'Plataforma integral para clínicas y consultorios. Expedientes médicos electrónicos, historial de citas, historia clínica, consultas y laboratorios — todo en un solo lugar.',
        longDescription:
            'HMS es una plataforma médica completa diseñada para clínicas, consultorios y hospitales pequeños. Permite a los profesionales de la salud gestionar expedientes electrónicos, agendar citas, registrar consultas y laboratorios, y mantener un historial clínico completo de cada paciente. Construido con enfoque en la experiencia del personal médico, para que puedan enfocarse en lo que importa: sus pacientes.',
        features: [
            'Expedientes médicos electrónicos',
            'Agenda y gestión de citas',
            'Historial clínico completo',
            'Registro de consultas y laboratorios',
            'Reportes y estadísticas',
        ],
        url: 'https://hms.artesanosdigitalescom.com.mx/',
        tags: ['Salud', 'Expedientes', 'Gestión'],
        images: [
            'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/4031818/pexels-photo-4031818.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
    },
    {
        number: '02',
        name: 'TransPort',
        subtitle: 'Gestión de Transporte y Flotas',
        shortDescription:
            'Sistema completo para empresas de transporte de pasajeros. Venta de boletos, gestión de rutas, encomiendas, reportes financieros y control de gastos.',
        longDescription:
            'TransPort es una solución end-to-end para empresas de transporte de pasajeros. Permite vender boletos en taquilla, gestionar rutas y flota, administrar encomiendas, generar reportes financieros y controlar gastos operativos en tiempo real. Diseñado para mantener toda la operación bajo control desde un solo panel.',
        features: [
            'Venta de boletos en taquilla',
            'Gestión de rutas y flotillas',
            'Módulo de encomiendas',
            'Reportes financieros diarios',
            'Control de gastos operativos',
        ],
        url: 'https://transport.artesanosdigitalescom.com.mx/',
        tags: ['Transporte', 'Logística', 'Finanzas'],
        images: [
            'https://images.pexels.com/photos/1426516/pexels-photo-1426516.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3806753/pexels-photo-3806753.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
    },
    {
        number: '03',
        name: 'PraderaOS',
        subtitle: 'Gestión Urbana Inteligente',
        shortDescription:
            'Plataforma para administración de fraccionamientos y desarrollos urbanos. Propiedades, residentes, mantenimiento, cobros y órdenes de trabajo con mapa.',
        longDescription:
            'PraderaOS es la herramienta que todo administrador de fraccionamiento necesita. Centraliza el registro de propiedades y residentes, gestiona pagos y cobros, organiza órdenes de trabajo y mantenimiento, y visualiza todo el desarrollo en un mapa interactivo. Ideal para fraccionamientos, desarrollos urbanos y comunidades residenciales.',
        features: [
            'Registro de propiedades y residentes',
            'Gestión de cobros y pagos',
            'Órdenes de trabajo y mantenimiento',
            'Visualización en mapa interactivo',
            'Sistema de quejas y seguimiento',
        ],
        url: 'https://urban-os.artesanosdigitalescom.com.mx/',
        tags: ['Inmobiliaria', 'Administración', 'Mapas'],
        images: [
            'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
    },
    {
        number: '04',
        name: 'InsurePipe',
        subtitle: 'ERP para Agencias de Seguros',
        shortDescription:
            'Sistema integral para agencias de seguros. Gestión de pólizas, clientes, siniestros, comisiones y cobranza — todo el pipeline del negocio asegurador.',
        longDescription:
            'InsurePipe es un ERP diseñado específicamente para agencias de seguros. Centraliza la gestión de pólizas, el seguimiento de clientes y prospectos, la administración de siniestros, el cálculo de comisiones y la cobranza. Permite a los agentes tener visibilidad completa de su cartera y automatizar procesos que antes se manejaban en hojas de cálculo.',
        features: [
            'Gestión completa de pólizas',
            'Pipeline de clientes y prospectos',
            'Seguimiento de siniestros',
            'Cálculo automático de comisiones',
            'Módulo de cobranza y pagos',
        ],
        url: 'https://erp-seguros.artesanosdigitalescom.com.mx/',
        tags: ['Seguros', 'ERP', 'Finanzas'],
        images: [
            'https://images.pexels.com/photos/7821486/pexels-photo-7821486.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
    },
    {
        number: '05',
        name: 'Sistema POS',
        subtitle: 'Punto de Venta para Restaurantes y Comercios',
        shortDescription:
            'Sistema de punto de venta con mapa de mesas, inventario automatizado, cortes de caja, proveedores y reportes financieros para negocios.',
        longDescription:
            'Un punto de venta completo para restaurantes y comercios. Incluye plano de mesas interactivo para restaurantes, venta en caja con escaneo de códigos, control de inventario en tiempo real, gestión de proveedores y compras, órdenes, gastos, márgenes de utilidad, facturación y estacionamiento. Diseñado para operar rápido y confiable en negocios con alto volumen.',
        features: [
            'Plano de mesas interactivo (Restaurant POS)',
            'Punto de venta con escaneo de códigos',
            'Inventario y proveedores en tiempo real',
            'Cortes de caja y reportes financieros',
            'Gastos, márgenes y facturación',
        ],
        url: 'https://pos.artesanosdigitalescom.com.mx/login',
        tags: ['Restaurantes', 'POS', 'Inventario'],
        images: [
            '/portfolio/pos/floor-plan.png',
            '/portfolio/pos/punto-venta.png',
            '/portfolio/pos/tablero.png',
        ],
    },
    {
        number: '06',
        name: 'Jametaro',
        subtitle: 'Sitio Web para Restaurante de Sushi',
        shortDescription:
            'Sitio web y plataforma digital para Jametaro, restaurante de sushi en Oaxaca. Menú en línea, reservaciones y presencia digital.',
        longDescription:
            'Jametaro es un restaurante de sushi ubicado en Oaxaca que combina la tradición culinaria japonesa con el espíritu local. Desarrollamos su plataforma digital completa: sitio web con menú interactivo, sistema de reservaciones, galería fotográfica y presencia en línea que refleja la identidad única del restaurante — desde su icónico logo hasta la atmósfera de su local.',
        features: [
            'Sitio web con identidad de marca',
            'Menú digital interactivo',
            'Sistema de reservaciones',
            'Galería fotográfica del restaurante',
            'Optimizado para móviles',
        ],
        url: 'https://jametaro.artesanosdigitalescom.com.mx/',
        tags: ['Restaurante', 'Sushi', 'Web'],
        images: [
            '/portfolio/jametaro/logo.png',
            '/portfolio/jametaro/storefront.jpg',
        ],
    },
];

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (!project) return;
        setImageIndex(0);
        document.body.style.overflow = 'hidden';
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') setImageIndex((i) => (i - 1 + project.images.length) % project.images.length);
            if (e.key === 'ArrowRight') setImageIndex((i) => (i + 1) % project.images.length);
        };
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    className="project-modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="project-modal"
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="project-modal-close" onClick={onClose} aria-label="Cerrar">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>

                        <div className="project-modal-gallery">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={imageIndex}
                                    src={project.images[imageIndex]}
                                    alt={`${project.name} screenshot ${imageIndex + 1}`}
                                    className="project-modal-image"
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </AnimatePresence>
                            {project.images.length > 1 && (
                                <>
                                    <button
                                        className="project-modal-arrow project-modal-arrow-left"
                                        onClick={() => setImageIndex((i) => (i - 1 + project.images.length) % project.images.length)}
                                        aria-label="Imagen anterior"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <path d="M13 4l-6 6 6 6" />
                                        </svg>
                                    </button>
                                    <button
                                        className="project-modal-arrow project-modal-arrow-right"
                                        onClick={() => setImageIndex((i) => (i + 1) % project.images.length)}
                                        aria-label="Imagen siguiente"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <path d="M7 4l6 6-6 6" />
                                        </svg>
                                    </button>
                                    <div className="project-modal-dots">
                                        {project.images.map((_, i) => (
                                            <button
                                                key={i}
                                                className={`project-modal-dot ${i === imageIndex ? 'active' : ''}`}
                                                onClick={() => setImageIndex(i)}
                                                aria-label={`Imagen ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="project-modal-content">
                            <span className="project-modal-number">{project.number}</span>
                            <div className="project-modal-tags">
                                {project.tags.map((tag) => (
                                    <span className="portfolio-tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                            <h3 className="project-modal-title serif-display">{project.name}</h3>
                            <span className="project-modal-subtitle">{project.subtitle}</span>
                            <p className="project-modal-description">{project.longDescription}</p>
                            <div className="project-modal-features">
                                <span className="eyebrow" style={{ color: 'var(--accent-green)' }}>Características</span>
                                <ul>
                                    {project.features.map((f) => (
                                        <li key={f}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-solid project-modal-demo"
                            >
                                Ver Demo en Vivo →
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function Portfolio() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                    <motion.button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="portfolio-card portfolio-card-button"
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
                            <p className="portfolio-desc">{project.shortDescription}</p>
                        </div>
                        <div className="portfolio-card-footer">
                            <span className="portfolio-link">Ver Detalles</span>
                            <span className="portfolio-arrow">&rarr;</span>
                        </div>
                    </motion.button>
                ))}
            </div>
            <ScrollArrow to="testimonials" light />

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
}
