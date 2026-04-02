'use client';

import { useEffect, useState } from 'react';
import { useDiscovery } from './DiscoveryProvider';
import QuestionScreen from './QuestionScreen';
import BriefSummary from './BriefSummary';
import HandoffScreen from './HandoffScreen';
import { useReveal } from '@/hooks/useReveal';

export default function DiscoveryFlow() {
    const { state, submitAnswer, goBack, reset, fetchQuestion } = useDiscovery();
    const { ref: infoRef, visible: infoVisible } = useReveal(0.2);
    const [showHandoff, setShowHandoff] = useState(false);

    // Fetch the first question on mount
    useEffect(() => {
        fetchQuestion([]);
    }, [fetchQuestion]);

    const handleSubmitAnswer = (value: string | string[]) => {
        if (!state.currentQuestion) return;
        submitAnswer({
            questionId: state.currentQuestion.id,
            questionText: state.currentQuestion.text,
            answer: value,
        });
    };

    return (
        <section className="contact" id="contact">
            {/* Left column — contact info (preserved) */}
            <div className="contact-info" ref={infoRef}>
                <span className={`eyebrow reveal reveal-left ${infoVisible ? 'revealed' : ''}`}>Contacto</span>
                <h2 className={`contact-title serif-display reveal reveal-left reveal-d1 ${infoVisible ? 'revealed' : ''}`}>
                    ¿Listo para crear algo <i>extraordinario?</i>
                </h2>
                <p className={`contact-body reveal reveal-left reveal-d2 ${infoVisible ? 'revealed' : ''}`}>
                    Responde algunas preguntas y crearemos un brief personalizado para tu proyecto.
                </p>

                <div className={`contact-details reveal reveal-left reveal-d3 ${infoVisible ? 'revealed' : ''}`}>
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

                <div className={`contact-available reveal reveal-left reveal-d4 ${infoVisible ? 'revealed' : ''}`}>
                    <span className="contact-dot" />
                    Disponible para nuevos proyectos
                </div>
            </div>

            {/* Right column — Discovery wizard */}
            <div className="contact-form discovery-wizard">
                {state.error && (
                    <div className="discovery-error">
                        <p>{state.error}</p>
                        <button className="btn-outline" onClick={() => fetchQuestion(state.answers)} style={{ marginTop: '1rem' }}>
                            Reintentar
                        </button>
                    </div>
                )}

                {!state.error && !state.isComplete && !state.brief && state.currentQuestion && (
                    <QuestionScreen
                        question={state.currentQuestion}
                        step={state.step}
                        totalEstimate={8}
                        onSubmit={handleSubmitAnswer}
                        onBack={state.step > 0 ? goBack : null}
                        isLoading={state.isLoading}
                    />
                )}

                {!state.error && !state.brief && (state.isLoading && !state.currentQuestion) && (
                    <div className="discovery-loading">
                        <div className="discovery-loading-dots">
                            <span /><span /><span />
                        </div>
                        <p className="meta-text">Preparando tu experiencia...</p>
                    </div>
                )}

                {!state.error && state.brief && !showHandoff && (
                    <BriefSummary brief={state.brief} onHandoff={() => setShowHandoff(true)} />
                )}

                {!state.error && state.brief && showHandoff && (
                    <HandoffScreen brief={state.brief} onReset={() => { setShowHandoff(false); reset(); }} />
                )}
            </div>
        </section>
    );
}
