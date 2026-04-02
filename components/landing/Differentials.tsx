'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollArrow from './ScrollArrow';

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

const items = [
    {
        number: '01',
        title: 'Identidad y Raíz',
        description:
            'Llevamos el nombre de nuestra tierra con orgullo. Desde la Mixteca demostramos que aquí se construye trabajo de clase mundial.',
    },
    {
        number: '02',
        title: 'Tu Negocio Primero',
        description:
            'No te adaptamos a nuestro software. Nosotros nos adaptamos a tu negocio. Cada solución nace de entender tu operación, tus clientes y tu visión.',
    },
    {
        number: '03',
        title: 'Crecimiento Compartido',
        description:
            'Tu éxito es nuestro éxito. No solo entregamos un proyecto — nos convertimos en tu socio tecnológico y crecemos contigo a largo plazo.',
    },
];

export default function Differentials() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="differentials" id="differentials" ref={ref} style={{ perspective: 1000 }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...slow, delay: 0.1 }}
            >
                <span className="eyebrow">Por Qué Nosotros</span>
                <h2 className="differentials-heading serif-display">
                    El <i>Diferencial</i>
                </h2>
                <p className="differentials-subtitle">
                    No somos solo desarrolladores. Somos artesanos comprometidos con tu crecimiento.
                </p>
            </motion.div>
            <div className="differentials-grid">
                {items.map((item, i) => (
                    <motion.div
                        className="differential-card"
                        key={item.number}
                        initial={{ opacity: 0, y: 60, rotateX: 6 }}
                        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                        transition={{ ...slow, delay: 0.4 + i * 0.25 }}
                    >
                        <span className="differential-number">{item.number}</span>
                        <h3 className="differential-title serif-display">{item.title}</h3>
                        <p className="differential-desc">{item.description}</p>
                    </motion.div>
                ))}
            </div>
            <ScrollArrow to="portfolio" />
        </section>
    );
}
