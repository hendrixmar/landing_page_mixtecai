'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollArrow from './ScrollArrow';

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

const testimonials = [
    {
        quote: 'Gracias a Artesanos Digitales, tenemos nuestro sistema de estacionamiento y un punto de venta. El sistema de inventario automatizado nos ahorra horas de trabajo diario.',
        author: 'Frutería La Gran Fruta',
        location: 'Huajuapan de León',
    },
    {
        quote: 'La solución web que implementaron nos ayudó a escalar la captación de clientes y mejorar nuestra administración de las operaciones diarias.',
        author: 'Envíos AD Express',
        location: 'Oaxaca',
    },
];

export default function Testimonials() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="testimonials" id="testimonials" ref={ref}>
            <motion.div
                className="testimonials-header"
                initial={{ opacity: 0, x: -80 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...slow, delay: 0.1 }}
            >
                <span className="eyebrow" style={{ color: 'var(--accent-green)' }}>Testimonios</span>
                <h2 className="testimonials-title serif-display">
                    "Llevamos la <i>Mixteca</i> al siguiente nivel."
                </h2>
                <div className="testimonials-founder">
                    <span className="founder-name">Hendrik Martina</span>
                    <span className="meta-text">Fundador, Artesanos Digitales</span>
                </div>
            </motion.div>
            <div className="testimonials-grid">
                {testimonials.map((t, i) => (
                    <motion.div
                        className="testimonial-card"
                        key={i}
                        initial={{ opacity: 0, x: 80 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ ...slow, delay: 0.4 + i * 0.3 }}
                    >
                        <p className="testimonial-quote">"{t.quote}"</p>
                        <div className="testimonial-author">
                            <span className="testimonial-name">{t.author}</span>
                            <span className="meta-text">{t.location}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
            <ScrollArrow to="studio" light />
        </section>
    );
}
