'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import ScrollArrow from './ScrollArrow';

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

export default function Manifesto() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    // Keep parallax on the whole section for scroll feel
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const sectionY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section className="manifesto" id="ethos" ref={ref}>
            <motion.div style={{ y: sectionY }}>
                <motion.span
                    className="eyebrow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...slow, delay: 0.1 }}
                >
                    Nuestra Filosofía
                </motion.span>
                <h2 className="manifesto-statement serif-display">
                    <motion.span
                        style={{ display: 'inline-block' }}
                        initial={{ opacity: 0, x: -150 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ ...slow, delay: 0.3 }}
                    >
                        Código
                    </motion.span>
                    <motion.span
                        style={{ display: 'inline-block' }}
                        initial={{ opacity: 0, x: 150 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ ...slow, delay: 0.3 }}
                    >
                        Tejido
                    </motion.span>
                </h2>
                <motion.p
                    className="manifesto-body"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...slow, delay: 0.6 }}
                >
                    Ya no solo tejemos palma o tallamos madera, ahora esculpimos algoritmos y le damos forma al código.
                </motion.p>
            </motion.div>
            <ScrollArrow to="problem" />
        </section>
    );
}
