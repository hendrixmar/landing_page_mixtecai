'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollArrow from './ScrollArrow';

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

const issues = [
    'Soluciones genéricas que no entienden tu negocio',
    'Proveedores que desaparecen después de entregar',
    'Proyectos que se quedan a medias o nunca funcionan',
    'Falta de comunicación y resultados reales',
];

export default function Problem() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="problem" id="problem" ref={ref}>
            <motion.div
                className="problem-content"
                initial={{ opacity: 0, x: -100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...slow, delay: 0.1 }}
            >
                <span className="eyebrow">El Problema</span>
                <h2 className="problem-title serif-display">
                    Tu negocio merece <br /><i>más que lo básico</i>
                </h2>
                <p className="problem-body">
                    Muchas empresas reciben soluciones prefabricadas que no se adaptan a su realidad. Se pierden el toque humano, la atención al detalle y el compromiso de ver el proyecto hasta el final. Además, el talento tecnológico suele concentrarse en las grandes ciudades, dejando atrás la riqueza y el potencial de nuestras regiones.
                </p>
                <div className="problem-issues">
                    {issues.map((issue, i) => (
                        <motion.div
                            className="problem-issue"
                            key={i}
                            initial={{ opacity: 0, y: 25 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ ...slow, delay: 0.5 + i * 0.2 }}
                        >
                            <span className="problem-dot" />
                            {issue}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <motion.div
                className="problem-solution"
                initial={{ opacity: 0, x: 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...slow, delay: 0.3 }}
            >
                <span className="eyebrow" style={{ color: 'var(--accent-green)' }}>Nuestra Respuesta</span>
                <h2 className="problem-title serif-display">
                    Crecemos <i>juntos</i> <br />con nuestros clientes
                </h2>
                <p className="problem-body">
                    No entregamos un producto y nos vamos. Nos sentamos contigo, entendemos tu operación, y construimos soluciones que realmente funcionan para tu negocio. Cuando tú creces, nosotros crecemos. Así de simple.
                </p>
                <blockquote className="problem-quote">
                    "El costo de la curiosidad se ha reducido a 0."
                </blockquote>
            </motion.div>
            <ScrollArrow to="services" light />
        </section>
    );
}
