'use client';

import { motion } from 'framer-motion';
import type { DiscoveryBrief } from '@/types/discovery';

interface BriefSummaryProps {
    brief: DiscoveryBrief;
    onHandoff: () => void;
}

export default function BriefSummary({ brief, onHandoff }: BriefSummaryProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="discovery-brief"
        >
            <span className="eyebrow" style={{ color: 'var(--accent-green)' }}>
                Brief Generado
            </span>
            <h3 className="discovery-brief-title serif-display">
                Tu Proyecto en Resumen
            </h3>

            <p className="discovery-brief-summary">{brief.summary}</p>

            <div className="discovery-brief-grid">
                {brief.businessType && (
                    <div className="discovery-brief-item">
                        <span className="discovery-brief-label">Tipo de Negocio</span>
                        <span className="discovery-brief-value">{brief.businessType}</span>
                    </div>
                )}
                {brief.challenges && (
                    <div className="discovery-brief-item">
                        <span className="discovery-brief-label">Desafíos</span>
                        <span className="discovery-brief-value">{brief.challenges}</span>
                    </div>
                )}
                {brief.goals && (
                    <div className="discovery-brief-item">
                        <span className="discovery-brief-label">Objetivos</span>
                        <span className="discovery-brief-value">{brief.goals}</span>
                    </div>
                )}
                {brief.scope && (
                    <div className="discovery-brief-item">
                        <span className="discovery-brief-label">Alcance</span>
                        <span className="discovery-brief-value">{brief.scope}</span>
                    </div>
                )}
                {brief.budget && (
                    <div className="discovery-brief-item">
                        <span className="discovery-brief-label">Presupuesto</span>
                        <span className="discovery-brief-value">{brief.budget}</span>
                    </div>
                )}
                {brief.timeline && (
                    <div className="discovery-brief-item">
                        <span className="discovery-brief-label">Timeline</span>
                        <span className="discovery-brief-value">{brief.timeline}</span>
                    </div>
                )}
            </div>

            <button className="btn-solid" onClick={onHandoff} style={{ width: '100%', textAlign: 'center', marginTop: 'var(--space-md)' }}>
                Continuar
            </button>
        </motion.div>
    );
}
