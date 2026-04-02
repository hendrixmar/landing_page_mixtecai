'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import ScrollArrow from './ScrollArrow';

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

export default function Editorial() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });

    // Keep scroll-driven zoom on image for cinematic feel
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imgScale = useTransform(scrollYProgress, [0, 0.6], [1.2, 1]);

    return (
        <section className="editorial" id="studio" ref={ref}>
            <motion.div
                className="editorial-img-wrap"
                style={{ overflow: 'hidden' }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ ...slow, delay: 0.1 }}
            >
                <motion.img
                    src="https://images.pexels.com/photos/4011030/pexels-photo-4011030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Detalle de taller oaxaqueño"
                    className="editorial-image"
                    style={{ scale: imgScale }}
                />
            </motion.div>
            <motion.div
                className="editorial-content"
                initial={{ opacity: 0, x: 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...slow, delay: 0.35 }}
            >
                <span className="eyebrow">Base de Operaciones</span>
                <h2 className="editorial-title serif-display">
                    El Taller <br />Digital
                </h2>
                <p className="editorial-body">
                    Ubicados en el corazón de la Mixteca Oaxaqueña, encontramos inspiración en la tradición para construir el futuro. Nuestro taller combina la dedicación del trabajo presencial con el alcance que la tecnología nos permite, siempre cerca de nuestros clientes.
                </p>
                <div>
                    <a href="#" className="btn-solid">Conocer al Equipo</a>
                </div>
            </motion.div>
            <ScrollArrow to="contact" />
        </section>
    );
}
