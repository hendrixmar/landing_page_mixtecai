'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollArrow from './ScrollArrow';
import AsciiCanvas from './AsciiCanvas';
import { useTextScramble } from '@/hooks/useTextScramble';

export default function Hero() {
    const [loaded, setLoaded] = useState(false);
    const { text: titleText, scramble: scrambleTitle } = useTextScramble(
        'Artesanos Digitales'
    );
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const canvasY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

    useEffect(() => {
        const t = setTimeout(() => {
            setLoaded(true);
            scrambleTitle();
        }, 100);
        return () => clearTimeout(t);
    }, [scrambleTitle]);

    return (
        <header className="hero hero-canvas-layout" id="hero" ref={ref}>
            {/* ASCII Canvas Background with parallax */}
            <motion.div className="hero-canvas-bg" style={{ y: canvasY }}>
                <AsciiCanvas />
            </motion.div>

            {/* Content overlay with fade-out on scroll */}
            <motion.div
                className={`hero-content hero-content-overlay ${loaded ? 'hero-entered' : ''}`}
                style={{ opacity: contentOpacity, y: contentY }}
            >
                <div>
                    <span className="eyebrow hero-anim hero-anim-1" style={{ color: 'var(--accent-green)' }}>
                        Huajuapan de León, Oaxaca
                    </span>
                    <h1
                        className="hero-title hero-anim hero-anim-2"
                        onMouseEnter={scrambleTitle}
                        style={{ cursor: 'default' }}
                    >
                        {titleText.split('').map((ch, i) =>
                            '!<>-_\\/[]{}—=+*^?#_'.includes(ch) ? (
                                <span key={i} className="scramble-char">{ch}</span>
                            ) : (
                                <span key={i}>{ch}</span>
                            )
                        )}
                    </h1>
                    <p className="meta-text hero-anim hero-anim-3 hero-desc">
                        Soluciones digitales hechas a mano. Trabajamos codo a codo con nuestros clientes para construir algo que supere lo esperado.
                    </p>
                    <div className="hero-buttons hero-anim hero-anim-4">
                        <a href="#contact" className="btn-solid">
                            Digitaliza Mi Negocio Hoy
                        </a>
                        <a href="#portfolio" className="btn-outline btn-outline-light">
                            Ver Portafolio
                        </a>
                    </div>
                </div>

                <div className="hero-bottom-meta hero-anim hero-anim-5">
                    <span className="meta-text">EST. 2026</span>
                    <span className="meta-text">LATITUD 17.8058° N</span>
                </div>
            </motion.div>

            <ScrollArrow to="ethos" light />
        </header>
    );
}
