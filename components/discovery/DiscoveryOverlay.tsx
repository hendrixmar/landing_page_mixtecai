'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDiscovery } from './DiscoveryProvider';
import QuestionScreen from './QuestionScreen';
import BriefSummary from './BriefSummary';
import HandoffScreen from './HandoffScreen';

interface DiscoveryOverlayProps {
    open: boolean;
    onClose: () => void;
}

export default function DiscoveryOverlay({ open, onClose }: DiscoveryOverlayProps) {
    const { state, submitAnswer, goBack, reset, fetchQuestion } = useDiscovery();
    const [showHandoff, setShowHandoff] = useState(false);
    const [initialized, setInitialized] = useState(false);

    // Lock body scroll when open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Fetch first question when opened for the first time
    useEffect(() => {
        if (open && !initialized) {
            fetchQuestion([]);
            setInitialized(true);
        }
    }, [open, initialized, fetchQuestion]);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    const handleSubmitAnswer = useCallback((value: string | string[]) => {
        if (!state.currentQuestion) return;
        submitAnswer({
            questionId: state.currentQuestion.id,
            questionText: state.currentQuestion.text,
            answer: value,
        });
    }, [state.currentQuestion, submitAnswer]);

    const handleReset = useCallback(() => {
        setShowHandoff(false);
        reset();
    }, [reset]);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="discovery-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Close button */}
                    <button className="discovery-overlay-close" onClick={handleClose} aria-label="Cerrar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>

                    {/* Centered content container */}
                    <div className="discovery-overlay-content">
                        {state.error && (
                            <motion.div
                                className="discovery-error"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <p>{state.error}</p>
                                <button className="btn-outline" onClick={() => fetchQuestion(state.answers)} style={{ marginTop: '1rem' }}>
                                    Reintentar
                                </button>
                            </motion.div>
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

                        {!state.error && !state.brief && state.isLoading && !state.currentQuestion && (
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
                            <HandoffScreen brief={state.brief} onReset={handleReset} />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
