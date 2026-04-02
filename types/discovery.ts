export interface DiscoveryQuestion {
    id: string;
    text: string;
    type: 'text' | 'textarea' | 'select' | 'multiselect';
    options?: string[];
    placeholder?: string;
    aiGenerated: boolean;
}

export interface DiscoveryAnswer {
    questionId: string;
    questionText: string;
    answer: string | string[];
}

export interface DiscoveryBrief {
    id: string;
    clientName: string;
    clientEmail: string;
    businessType: string;
    challenges: string;
    goals: string;
    scope: string;
    budget: string;
    timeline: string;
    summary: string;
    rawAnswers: DiscoveryAnswer[];
    createdAt: string;
}

export type DiscoveryState = {
    step: number;
    answers: DiscoveryAnswer[];
    currentQuestion: DiscoveryQuestion | null;
    isLoading: boolean;
    isComplete: boolean;
    brief: DiscoveryBrief | null;
    error: string | null;
};

export type DiscoveryAction =
    | { type: 'SET_QUESTION'; question: DiscoveryQuestion }
    | { type: 'SUBMIT_ANSWER'; answer: DiscoveryAnswer }
    | { type: 'SET_LOADING'; loading: boolean }
    | { type: 'SET_COMPLETE' }
    | { type: 'SET_BRIEF'; brief: DiscoveryBrief }
    | { type: 'SET_ERROR'; error: string }
    | { type: 'GO_BACK' }
    | { type: 'RESET' };
