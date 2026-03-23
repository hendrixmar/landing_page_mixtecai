import { useReveal } from '../hooks/useReveal';

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
    const { ref: headerRef, visible: headerVisible } = useReveal(0.3);
    const { ref: gridRef, visible: gridVisible } = useReveal(0.1);

    return (
        <section className="portfolio" id="portfolio">
            <div className="portfolio-header" ref={headerRef}>
                <span className={`eyebrow reveal reveal-left ${headerVisible ? 'revealed' : ''}`}>Portafolio</span>
                <h2 className={`portfolio-heading serif-display reveal reveal-left reveal-d1 ${headerVisible ? 'revealed' : ''}`}>
                    Nuestro <i>Trabajo</i>
                </h2>
                <p className={`portfolio-subtitle reveal reveal-left reveal-d2 ${headerVisible ? 'revealed' : ''}`}>
                    Productos que construimos junto a nuestros clientes. Cada uno nació de una necesidad real y sigue creciendo con quienes lo usan.
                </p>
            </div>
            <div className="portfolio-grid" ref={gridRef}>
                {projects.map((project, i) => (
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`portfolio-card reveal reveal-up reveal-d${i} ${gridVisible ? 'revealed' : ''}`}
                        key={project.number}
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
                    </a>
                ))}
            </div>
            <div className="section-fade-bottom section-fade-dark-to-dark" />
        </section>
    );
}
