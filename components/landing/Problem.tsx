'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollArrow from './ScrollArrow';

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

const issues = [
    'Software genérico que no se adapta a ti',
    'Proveedores que desaparecen al entregar',
    'Proyectos a medias que nunca funcionan',
    'Cero comunicación, cero resultados',
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
                    Te venden soluciones de molde. Nadie se sienta contigo a entender cómo opera tu negocio. Y el talento tech se concentra en las grandes ciudades, ignorando el potencial de nuestras regiones.
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
                    No entregamos y nos vamos. Entendemos tu operación, construimos lo que necesitas y crecemos contigo. Así de simple.
                </p>
                <blockquote className="problem-quote">
                    "El costo de la curiosidad se ha reducido a 0."
                </blockquote>
            </motion.div>
            <ScrollArrow to="services" light />
        </section>
    );
}
