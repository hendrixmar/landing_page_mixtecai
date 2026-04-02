'use client';

import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface SectionScrollResult {
    ref: React.RefObject<HTMLElement | null>;
    scrollYProgress: MotionValue<number>;
    opacity: MotionValue<number>;
    y: MotionValue<number>;
}

export function useSectionScroll(options?: {
    offset?: ['start end' | 'start start' | 'end start' | 'end end' | 'center center', 'start end' | 'start start' | 'end start' | 'end end' | 'center center'];
    opacityRange?: [number[], number[]];
    yRange?: [number[], number[]];
}): SectionScrollResult {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: options?.offset ?? ['start end', 'end start'],
    });

    const opacity = useTransform(
        scrollYProgress,
        options?.opacityRange?.[0] ?? [0, 0.3, 0.7, 1],
        options?.opacityRange?.[1] ?? [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        options?.yRange?.[0] ?? [0, 0.3],
        options?.yRange?.[1] ?? [60, 0]
    );

    return { ref, scrollYProgress, opacity, y };
}
