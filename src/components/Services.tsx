import { useReveal } from '../hooks/useReveal';

const services = [
    { number: '01', title: 'Desarrollo a Medida' },
    { number: '02', title: 'Sistemas y Automatización' },
    { number: '03', title: 'Tiendas en Línea' },
    { number: '04', title: 'Consultoría Digital' },
];

export default function Services() {
    const { ref: headerRef, visible: headerVisible } = useReveal(0.3);
    const { ref: listRef, visible: listVisible } = useReveal(0.1);

    return (
        <section className="index-section" id="services">
            <div className="index-header" ref={headerRef}>
                <span className={`eyebrow reveal reveal-left ${headerVisible ? 'revealed' : ''}`}>Lo Que Hacemos</span>
                <h2 className={`serif-display reveal reveal-left reveal-d1 ${headerVisible ? 'revealed' : ''}`} style={{ fontSize: '3rem', marginTop: 'var(--space-xs)' }}>
                    Áreas de <br /><i>Enfoque</i>
                </h2>
            </div>
            <div className="index-list" ref={listRef}>
                {services.map((service, i) => (
                    <a href="#" className={`index-item reveal reveal-up reveal-d${i} ${listVisible ? 'revealed' : ''}`} key={service.number}>
                        <span className="index-number">{service.number}</span>
                        <h3 className="index-title serif-display">{service.title}</h3>
                        <span className="index-action">Explorar</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
