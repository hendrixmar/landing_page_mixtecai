'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollArrow from './ScrollArrow';

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

const services = [
    { number: '01', title: 'Desarrollo a Medida' },
    { number: '02', title: 'Sistemas y Automatización' },
    { number: '03', title: 'Tiendas en Línea' },
    { number: '04', title: 'Consultoría Digital' },
];

export default function Services() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="index-section" id="services" ref={ref}>
            <motion.div
                className="index-header"
                initial={{ opacity: 0, x: -80 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...slow, delay: 0.1 }}
            >
                <span className="eyebrow">Lo Que Hacemos</span>
                <h2 className="serif-display index-header-title">
                    Áreas de <br /><i>Enfoque</i>
                </h2>
            </motion.div>
            <div className="index-list">
                {services.map((service, i) => (
                    <motion.a
                        href="#"
                        className="index-item"
                        key={service.number}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ ...slow, delay: 0.3 + i * 0.2 }}
                    >
                        <span className="index-number">{service.number}</span>
                        <h3 className="index-title serif-display">{service.title}</h3>
                        <span className="index-action">Explorar</span>
                    </motion.a>
                ))}
            </div>
            <ScrollArrow to="differentials" />
        </section>
    );
}
