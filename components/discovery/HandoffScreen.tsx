'use client';

import { motion } from 'framer-motion';
import type { DiscoveryBrief } from '@/types/discovery';

interface HandoffScreenProps {
    brief: DiscoveryBrief;
    onReset: () => void;
}

export default function HandoffScreen({ brief, onReset }: HandoffScreenProps) {
    const whatsappMessage = encodeURIComponent(
        `Hola, soy ${brief.clientName}. Acabo de completar el descubrimiento de proyecto en su sitio.\n\nResumen: ${brief.summary}\n\nBrief ID: ${brief.id}`
    );

    const emailSubject = encodeURIComponent(`[Nuevo Proyecto] ${brief.clientName} - ${brief.businessType}`);
    const emailBody = encodeURIComponent(
        `Nombre: ${brief.clientName}\nEmail: ${brief.clientEmail}\nNegocio: ${brief.businessType}\n\nResumen: ${brief.summary}\n\nDesafíos: ${brief.challenges}\nObjetivos: ${brief.goals}\nAlcance: ${brief.scope}\n\nBrief ID: ${brief.id}`
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="discovery-handoff"
        >
            <span className="eyebrow" style={{ color: 'var(--accent-green)' }}>
                ¡Listo!
            </span>
            <h3 className="discovery-handoff-title serif-display">
                Hablemos de tu proyecto
            </h3>
            <p className="discovery-handoff-body">
                Ya tenemos un panorama claro de lo que necesitas. Elige cómo prefieres continuar la conversación.
            </p>

            <div className="discovery-handoff-buttons">
                <a
                    href={`https://wa.me/529512389703?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-solid discovery-whatsapp-btn"
                >
                    <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" style={{ marginRight: '0.5rem' }}>
                        <path d="M16.004 0C7.165 0 .003 7.16.003 15.997c0 2.82.737 5.573 2.14 7.998L.01 32l8.207-2.1a15.94 15.94 0 007.787 1.985C24.842 31.885 32 24.725 32 15.997 32 7.16 24.842 0 16.004 0zm0 29.29a13.29 13.29 0 01-7.115-2.058l-.51-.303-4.87 1.247 1.3-4.727-.332-.53A13.28 13.28 0 012.6 15.997c0-7.39 6.015-13.402 13.404-13.402 7.39 0 13.4 6.012 13.4 13.402 0 7.39-6.01 13.293-13.4 13.293zm7.35-10.03c-.402-.2-2.38-1.175-2.75-1.31-.37-.133-.64-.2-.91.2-.27.4-1.044 1.31-1.28 1.58-.236.27-.47.3-.873.1-.403-.2-1.7-.627-3.24-1.998-1.197-1.068-2.005-2.387-2.24-2.79-.236-.4-.025-.617.177-.817.182-.18.403-.47.605-.704.2-.236.267-.403.4-.672.134-.27.067-.504-.033-.705-.1-.2-.91-2.19-1.247-3-.328-.788-.66-.68-.91-.694-.235-.012-.504-.015-.773-.015s-.705.1-1.074.504c-.37.403-1.41 1.377-1.41 3.36 0 1.98 1.443 3.894 1.644 4.163.2.27 2.838 4.332 6.88 6.074.96.415 1.71.663 2.295.849.964.307 1.842.263 2.536.16.774-.116 2.38-.974 2.716-1.913.335-.94.335-1.746.235-1.913-.1-.168-.37-.268-.773-.47z" />
                    </svg>
                    Continuar por WhatsApp
                </a>
                <a
                    href={`mailto:hendrikmartina@artesanosdigitalescom.com?subject=${emailSubject}&body=${emailBody}`}
                    className="btn-outline discovery-email-btn"
                >
                    Enviar por Correo
                </a>
            </div>

            <button className="discovery-reset" onClick={onReset}>
                Empezar de nuevo
            </button>
        </motion.div>
    );
}
