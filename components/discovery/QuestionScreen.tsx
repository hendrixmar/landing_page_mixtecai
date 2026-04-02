'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DiscoveryQuestion } from '@/types/discovery';

interface QuestionScreenProps {
    question: DiscoveryQuestion;
    step: number;
    totalEstimate: number;
    onSubmit: (answer: string | string[]) => void;
    onBack: (() => void) | null;
    isLoading: boolean;
}

export default function QuestionScreen({
    question,
    step,
    totalEstimate,
    onSubmit,
    onBack,
    isLoading,
}: QuestionScreenProps) {
    const [textValue, setTextValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleSubmit = () => {
        if (question.type === 'text' || question.type === 'textarea') {
            if (!textValue.trim()) return;
            onSubmit(textValue.trim());
            setTextValue('');
        } else if (question.type === 'select') {
            if (selectedOptions.length === 0) return;
            onSubmit(selectedOptions[0]);
            setSelectedOptions([]);
        } else if (question.type === 'multiselect') {
            if (selectedOptions.length === 0) return;
            onSubmit(selectedOptions);
            setSelectedOptions([]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const toggleOption = (option: string) => {
        if (question.type === 'select') {
            setSelectedOptions([option]);
        } else {
            setSelectedOptions((prev) =>
                prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
            );
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="discovery-question"
            >
                <div className="discovery-progress">
                    <span className="meta-text">
                        Pregunta {step + 1} de ~{totalEstimate}
                    </span>
                    <div className="discovery-progress-bar">
                        <motion.div
                            className="discovery-progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / totalEstimate) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <h3 className="discovery-question-text serif-display">{question.text}</h3>

                {question.type === 'text' && (
                    <input
                        type={question.id === 'q-email' ? 'email' : 'text'}
                        className="discovery-input"
                        placeholder={question.placeholder || ''}
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        disabled={isLoading}
                    />
                )}

                {question.type === 'textarea' && (
                    <textarea
                        className="discovery-input discovery-textarea"
                        placeholder={question.placeholder || ''}
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        disabled={isLoading}
                        rows={4}
                    />
                )}

                {(question.type === 'select' || question.type === 'multiselect') && question.options && (
                    <div className="discovery-options">
                        {question.options.map((option) => (
                            <button
                                key={option}
                                className={`discovery-option ${selectedOptions.includes(option) ? 'selected' : ''}`}
                                onClick={() => toggleOption(option)}
                                disabled={isLoading}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}

                <div className="discovery-actions">
                    {onBack && (
                        <button className="btn-outline discovery-back" onClick={onBack} disabled={isLoading}>
                            Atrás
                        </button>
                    )}
                    <button
                        className="btn-solid discovery-next"
                        onClick={handleSubmit}
                        disabled={isLoading || (question.type === 'text' || question.type === 'textarea' ? !textValue.trim() : selectedOptions.length === 0)}
                    >
                        {isLoading ? 'Pensando...' : 'Continuar'}
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
