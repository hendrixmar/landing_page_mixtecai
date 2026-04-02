'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

interface ContactCTAProps {
    onStartDiscovery: () => void;
}

export default function ContactCTA({ onStartDiscovery }: ContactCTAProps) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="contact" id="contact" ref={ref}>
            <motion.div
                className="contact-info"
                initial={{ opacity: 0, x: -80 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...slow, delay: 0.1 }}
            >
                <span className="eyebrow">Contacto</span>
                <h2 className="contact-title serif-display">
                    ¿Listo para crear algo <i>extraordinario?</i>
                </h2>
                <p className="contact-body">
                    Cada proyecto empieza con una conversación. Cuéntanos qué necesitas y construyamos juntos algo que supere tus expectativas.
                </p>

                <div className="contact-details">
                    <a href="mailto:hendrikmartina@artesanosdigitalescom.com" className="contact-detail-item">
                        <span className="contact-detail-label">Correo Electrónico</span>
                        <span className="contact-detail-value">hendrikmartina@artesanosdigitalescom.com</span>
                    </a>
                    <a href="https://wa.me/529512389703" className="contact-detail-item">
                        <span className="contact-detail-label">WhatsApp / Teléfono</span>
                        <span className="contact-detail-value">+52 (951) 238-9703</span>
                    </a>
                    <a
                        href="https://maps.app.goo.gl/GBZAKSL58avatS9a9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-detail-item"
                    >
                        <span className="contact-detail-label">Ubicación</span>
                        <span className="contact-detail-value">Huajuapan de León, Santa Teresa, Oaxaca</span>
                    </a>
                </div>

                <div className="contact-available">
                    <span className="contact-dot" />
                    Disponible para nuevos proyectos
                </div>
            </motion.div>

            <motion.div
                className="contact-form contact-cta-panel"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...slow, delay: 0.4 }}
            >
                <span className="eyebrow" style={{ color: 'var(--accent-green)' }}>Descubrimiento</span>
                <h3 className="contact-cta-title serif-display">
                    Cuéntanos sobre tu proyecto
                </h3>
                <p className="contact-cta-body">
                    Te guiaremos con preguntas personalizadas para entender tu negocio y crear un brief a medida. Solo toma unos minutos.
                </p>
                <button className="btn-solid contact-cta-btn" onClick={onStartDiscovery}>
                    Empezar Descubrimiento
                </button>
                <p className="meta-text" style={{ marginTop: 'var(--space-sm)', opacity: 0.5 }}>
                    ~3 minutos · Sin compromiso
                </p>
            </motion.div>
        </section>
    );
}
