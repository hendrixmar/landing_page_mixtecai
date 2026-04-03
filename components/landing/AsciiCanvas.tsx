'use client';

import { useEffect, useRef } from 'react';

const OAXACA_WORDS = [
    'quesillo', 'tlayuda', 'memela', 'mole', 'mezcal', 'chocolate',
    'chapulín', 'tasajo', 'tejate', 'tamales', 'barbacoa', 'mixteca',
    'guelaguetza', 'alebrije', 'barro negro', 'tapete', 'huipil',
    'copal', 'pulque', 'totopos', 'empanada', 'nicuatole', 'pan de yema',
    'chilacayota', 'chintextle', 'hierba santa', 'hoja santa',
    'enmolada', 'entomatada', 'enchilada', 'pozole', 'maguey',
    'agave', 'petate', 'morral', 'rebozo', 'calenda', 'tepache',
    'nieve', 'paleta', 'cacahuate', 'amaranto', 'nopal',
];

const WORD_FONT_SIZE = 11;

interface FloatingWord {
    word: string;
    x: number;
    y: number;
    speed: number;
    alpha: number;
    baseAlpha: number;
}

function simpleNoise(x: number, y: number, t: number) {
    return (
        Math.sin(x * 0.05 + t) * Math.cos(y * 0.05 + t) +
        Math.sin(x * 0.01 - t) * Math.cos(y * 0.12) * 0.5
    );
}

export default function AsciiCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const timeRef = useRef(0);
    const rafRef = useRef(0);
    const wordsRef = useRef<FloatingWord[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;

        function initWords() {
            const count = Math.floor((width * height) / 8000);
            const words: FloatingWord[] = [];
            for (let i = 0; i < count; i++) {
                words.push(createWord());
            }
            wordsRef.current = words;
        }

        function createWord(forceBottom = false): FloatingWord {
            const baseAlpha = 0.08 + Math.random() * 0.2;
            return {
                word: OAXACA_WORDS[Math.floor(Math.random() * OAXACA_WORDS.length)],
                x: Math.random() * width,
                y: forceBottom ? height + 20 : height * 0.35 + Math.random() * height * 0.65,
                speed: 0.15 + Math.random() * 0.4,
                alpha: baseAlpha,
                baseAlpha,
            };
        }

        function resize() {
            const parent = canvas!.parentElement;
            if (!parent) return;
            width = parent.clientWidth;
            height = parent.clientHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas!.width = width * dpr;
            canvas!.height = height * dpr;
            ctx!.scale(dpr, dpr);
            canvas!.style.width = width + 'px';
            canvas!.style.height = height + 'px';
            initWords();
        }

        function handleMouseMove(e: MouseEvent) {
            const rect = canvas!.getBoundingClientRect();
            mouseRef.current = { x: e.clientX, y: e.clientY - rect.top };
        }

        function handleMouseLeave() {
            mouseRef.current = { x: -9999, y: -9999 };
        }

        function render() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const t = timeRef.current;

            ctx.font = `${WORD_FONT_SIZE}px monospace`;
            ctx.textBaseline = 'middle';

            // Draw floating Oaxacan words
            for (let i = 0; i < wordsRef.current.length; i++) {
                const w = wordsRef.current[i];

                // Drift upward slowly
                w.y -= w.speed;
                // Gentle horizontal sway
                const sway = Math.sin(t * 0.5 + i * 0.7) * 0.3;
                w.x += sway;

                // Respawn at bottom when off screen
                if (w.y < height * 0.25) {
                    wordsRef.current[i] = createWord(true);
                    continue;
                }

                // Fade based on vertical position (fainter near top)
                const normalizedY = (w.y - height * 0.3) / (height * 0.7);
                const positionAlpha = Math.max(0, normalizedY) * w.baseAlpha;

                // Mouse interaction — words glow and scatter near cursor
                const dx = w.x - mx;
                const dy = w.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 180) {
                    const lensStrength = 1 - dist / 180;
                    // Push words away from cursor
                    const pushX = (dx / Math.max(dist, 1)) * lensStrength * 6;
                    const pushY = (dy / Math.max(dist, 1)) * lensStrength * 6;

                    // Glow green near cursor
                    const glowAlpha = Math.min(1, positionAlpha + lensStrength * 0.7);
                    ctx.fillStyle = `rgba(88, 214, 105, ${glowAlpha})`;
                    ctx.textAlign = 'center';
                    ctx.fillText(w.word, w.x + pushX, w.y + pushY);
                } else {
                    // Normal rendering
                    const noiseVal = simpleNoise(w.x * 0.02, w.y * 0.02, t * 0.3);
                    const flicker = 0.7 + noiseVal * 0.3;
                    const finalAlpha = positionAlpha * flicker;

                    if (finalAlpha > 0.02) {
                        ctx.fillStyle = `rgba(244, 244, 242, ${finalAlpha})`;
                        ctx.textAlign = 'center';
                        ctx.fillText(w.word, w.x, w.y);
                    }
                }
            }

            timeRef.current += 0.01;
            rafRef.current = requestAnimationFrame(render);
        }

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        rafRef.current = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="ascii-canvas" />;
}
