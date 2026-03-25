import { useReveal } from '../hooks/useReveal';
import ScrollArrow from './ScrollArrow';

export default function Problem() {
    const { ref: leftRef, visible: leftVisible } = useReveal(0.2);
    const { ref: rightRef, visible: rightVisible } = useReveal(0.2);

    const issues = [
        'Soluciones genéricas que no entienden tu negocio',
        'Proveedores que desaparecen después de entregar',
        'Proyectos que se quedan a medias o nunca funcionan',
        'Falta de comunicación y resultados reales',
    ];

    return (
        <section className="problem" id="problem">
            <div className="problem-content" ref={leftRef}>
                <span className={`eyebrow reveal reveal-left ${leftVisible ? 'revealed' : ''}`}>El Problema</span>
                <h2 className={`problem-title serif-display reveal reveal-left reveal-d1 ${leftVisible ? 'revealed' : ''}`}>
                    Tu negocio merece <br /><i>más que lo básico</i>
                </h2>
                <p className={`problem-body reveal reveal-left reveal-d2 ${leftVisible ? 'revealed' : ''}`}>
                    Muchas empresas reciben soluciones prefabricadas que no se adaptan a su realidad. Se pierden el toque humano, la atención al detalle y el compromiso de ver el proyecto hasta el final. Además, el talento tecnológico suele concentrarse en las grandes ciudades, dejando atrás la riqueza y el potencial de nuestras regiones.
                </p>
                <div className="problem-issues">
                    {issues.map((issue, i) => (
                        <div className={`problem-issue reveal reveal-up reveal-d${i + 3} ${leftVisible ? 'revealed' : ''}`} key={i}>
                            <span className="problem-dot" />
                            {issue}
                        </div>
                    ))}
                </div>
            </div>
            <div className="problem-solution" ref={rightRef}>
                <span className={`eyebrow reveal reveal-right ${rightVisible ? 'revealed' : ''}`} style={{ color: 'var(--accent-green)' }}>Nuestra Respuesta</span>
                <h2 className={`problem-title serif-display reveal reveal-right reveal-d1 ${rightVisible ? 'revealed' : ''}`}>
                    Crecemos <i>juntos</i> <br />con nuestros clientes
                </h2>
                <p className={`problem-body reveal reveal-right reveal-d2 ${rightVisible ? 'revealed' : ''}`}>
                    No entregamos un producto y nos vamos. Nos sentamos contigo, entendemos tu operación, y construimos soluciones que realmente funcionan para tu negocio. Cuando tú creces, nosotros crecemos. Así de simple.
                </p>
                <blockquote className={`problem-quote reveal reveal-right reveal-d3 ${rightVisible ? 'revealed' : ''}`}>
                    "El costo de la curiosidad se ha reducido a 0."
                </blockquote>
            </div>
            <ScrollArrow to="services" light />
        </section>
    );
}
