'use client';

import { createContext, useContext, useReducer, useCallback } from 'react';
import type { DiscoveryState, DiscoveryAction, DiscoveryAnswer, DiscoveryBrief, DiscoveryQuestion } from '@/types/discovery';

const initialState: DiscoveryState = {
    step: 0,
    answers: [],
    currentQuestion: null,
    isLoading: true,
    isComplete: false,
    brief: null,
    error: null,
};

function reducer(state: DiscoveryState, action: DiscoveryAction): DiscoveryState {
    switch (action.type) {
        case 'SET_QUESTION':
            return { ...state, currentQuestion: action.question, isLoading: false, error: null };
        case 'SUBMIT_ANSWER':
            return {
                ...state,
                answers: [...state.answers, action.answer],
                step: state.step + 1,
                isLoading: true,
            };
        case 'SET_LOADING':
            return { ...state, isLoading: action.loading };
        case 'SET_COMPLETE':
            return { ...state, isComplete: true, isLoading: true };
        case 'SET_BRIEF':
            return { ...state, brief: action.brief, isLoading: false };
        case 'SET_ERROR':
            return { ...state, error: action.error, isLoading: false };
        case 'GO_BACK':
            if (state.step <= 0) return state;
            return {
                ...state,
                answers: state.answers.slice(0, -1),
                step: state.step - 1,
                isLoading: true,
                isComplete: false,
                brief: null,
            };
        case 'RESET':
            return { ...initialState };
        default:
            return state;
    }
}

interface DiscoveryContextValue {
    state: DiscoveryState;
    submitAnswer: (answer: DiscoveryAnswer) => void;
    generateBrief: () => void;
    goBack: () => void;
    reset: () => void;
    fetchQuestion: (answers: DiscoveryAnswer[]) => void;
}

const DiscoveryContext = createContext<DiscoveryContextValue | null>(null);

export function useDiscovery() {
    const ctx = useContext(DiscoveryContext);
    if (!ctx) throw new Error('useDiscovery must be used within DiscoveryProvider');
    return ctx;
}

export default function DiscoveryProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchQuestion = useCallback(async (answers: DiscoveryAnswer[]) => {
        try {
            const res = await fetch('/api/discovery/next-question', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers }),
            });
            const data = await res.json();

            if (data.error) {
                dispatch({ type: 'SET_ERROR', error: data.error });
            } else if (data.complete) {
                dispatch({ type: 'SET_COMPLETE' });
                // Auto-generate brief
                generateBriefFromAnswers(answers);
            } else {
                dispatch({ type: 'SET_QUESTION', question: data.question as DiscoveryQuestion });
            }
        } catch {
            dispatch({ type: 'SET_ERROR', error: 'Error de conexión. Intenta de nuevo.' });
        }
    }, []);

    const generateBriefFromAnswers = useCallback(async (answers: DiscoveryAnswer[]) => {
        try {
            const res = await fetch('/api/discovery/generate-brief', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers }),
            });
            const data = await res.json();

            if (data.error) {
                dispatch({ type: 'SET_ERROR', error: data.error });
            } else {
                dispatch({ type: 'SET_BRIEF', brief: data.brief as DiscoveryBrief });
            }
        } catch {
            dispatch({ type: 'SET_ERROR', error: 'Error generando el brief.' });
        }
    }, []);

    const submitAnswer = useCallback((answer: DiscoveryAnswer) => {
        dispatch({ type: 'SUBMIT_ANSWER', answer });
        const newAnswers = [...state.answers, answer];
        fetchQuestion(newAnswers);
    }, [state.answers, fetchQuestion]);

    const generateBrief = useCallback(() => {
        dispatch({ type: 'SET_LOADING', loading: true });
        generateBriefFromAnswers(state.answers);
    }, [state.answers, generateBriefFromAnswers]);

    const goBack = useCallback(() => {
        dispatch({ type: 'GO_BACK' });
        const prevAnswers = state.answers.slice(0, -1);
        fetchQuestion(prevAnswers);
    }, [state.answers, fetchQuestion]);

    const reset = useCallback(() => {
        dispatch({ type: 'RESET' });
        fetchQuestion([]);
    }, [fetchQuestion]);

    return (
        <DiscoveryContext.Provider value={{ state, submitAnswer, generateBrief, goBack, reset, fetchQuestion }}>
            {children}
        </DiscoveryContext.Provider>
    );
}
