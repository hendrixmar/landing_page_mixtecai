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

const OAXACA_PLACES = [
    'Mitla', 'Monte Albán', 'Huajuapan', 'Cerro de las Minas',
    'Hierve el Agua', 'Tule', 'Zaachila', 'Yagul', 'Cuilápam',
    'Teotitlán', 'Tlaxiaco', 'Juxtlahuaca', 'Nochixtlán',
    'Putla', 'Pinotepa', 'Juchitán', 'Tehuantepec', 'Ixtlán',
    'Huautla', 'Tuxtepec', 'Puerto Escondido', 'Mazunte',
    'Zipolite', 'San Bartolo', 'Atzompa', 'Ocotlán',
    'Tlacolula', 'Etla', 'Pochutla', 'Miahuatlán',
    'Tonalá', 'Santiago Apoala', 'San José del Pacífico',
];

const WORD_FONT_SIZE = 11;
const PLACE_FONT_SIZE = 10;
const WAVE_ROWS = 8;
const WAVE_AMPLITUDE = 18;

interface FloatingWord {
    word: string;
    x: number;
    y: number;
    speed: number;
    baseAlpha: number;
}

interface WavePlace {
    place: string;
    row: number;
    baseX: number;
    offset: number;
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
    const placesRef = useRef<WavePlace[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;

        function initWords() {
            const count = Math.floor((width * height) / 12000);
            const words: FloatingWord[] = [];
            for (let i = 0; i < count; i++) {
                words.push(createWord());
            }
            wordsRef.current = words;
        }

        function createWord(forceBottom = false): FloatingWord {
            return {
                word: OAXACA_WORDS[Math.floor(Math.random() * OAXACA_WORDS.length)],
                x: Math.random() * width,
                y: forceBottom ? height + 20 : height * 0.3 + Math.random() * height * 0.45,
                speed: 0.12 + Math.random() * 0.3,
                baseAlpha: 0.06 + Math.random() * 0.14,
            };
        }

        function initPlaces() {
            const places: WavePlace[] = [];
            for (let row = 0; row < WAVE_ROWS; row++) {
                // Fill each row with place names end-to-end
                let x = -(Math.random() * 200);
                while (x < width + 200) {
                    const place = OAXACA_PLACES[Math.floor(Math.random() * OAXACA_PLACES.length)];
                    places.push({
                        place,
                        row,
                        baseX: x,
                        offset: Math.random() * Math.PI * 2,
                    });
                    x += place.length * (PLACE_FONT_SIZE * 0.6) + 30 + Math.random() * 40;
                }
            }
            placesRef.current = places;
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
            initPlaces();
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

            // ── Wave layer: Oaxacan places ──
            const waveZoneStart = height * 0.55;
            const waveZoneHeight = height * 0.42;
            const rowSpacing = waveZoneHeight / WAVE_ROWS;

            ctx.font = `${PLACE_FONT_SIZE}px monospace`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'left';

            for (let i = 0; i < placesRef.current.length; i++) {
                const p = placesRef.current[i];
                const rowY = waveZoneStart + p.row * rowSpacing;

                // Horizontal drift — each row moves at different speed
                const direction = p.row % 2 === 0 ? 1 : -1;
                const driftSpeed = 0.15 + (p.row % 3) * 0.08;
                const driftX = p.baseX + direction * t * driftSpeed * 60;

                // Wrap around screen
                const totalWidth = width + 400;
                const wrappedX = ((driftX % totalWidth) + totalWidth) % totalWidth - 200;

                // Wave vertical displacement — sinusoidal water motion
                const waveY = rowY
                    + Math.sin(wrappedX * 0.008 + t * 1.2 + p.offset) * WAVE_AMPLITUDE
                    + Math.sin(wrappedX * 0.003 + t * 0.7) * WAVE_AMPLITUDE * 0.6
                    + Math.cos(wrappedX * 0.012 + t * 1.8 + p.row) * WAVE_AMPLITUDE * 0.3;

                // Fade: deeper rows are more visible
                const rowDepth = p.row / WAVE_ROWS;
                const baseAlpha = 0.04 + rowDepth * 0.12;

                // Mouse ripple
                const dx = wrappedX - mx;
                const dy = waveY - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let alpha = baseAlpha;
                let color = `rgba(244, 244, 242, ${alpha})`;
                let drawX = wrappedX;
                let drawY = waveY;

                if (dist < 200) {
                    const ripple = 1 - dist / 200;
                    // Ripple pushes words in a wave pattern
                    const rippleAngle = Math.atan2(dy, dx);
                    drawX += Math.cos(rippleAngle) * ripple * 15;
                    drawY += Math.sin(rippleAngle) * ripple * 15 + Math.sin(dist * 0.05 + t * 3) * ripple * 8;
                    alpha = Math.min(0.6, baseAlpha + ripple * 0.4);
                    color = `rgba(88, 214, 105, ${alpha})`;
                }

                ctx.fillStyle = color;
                ctx.fillText(p.place, drawX, drawY);
            }

            // ── Floating layer: food/culture words ──
            ctx.font = `${WORD_FONT_SIZE}px monospace`;
            ctx.textAlign = 'center';

            for (let i = 0; i < wordsRef.current.length; i++) {
                const w = wordsRef.current[i];

                w.y -= w.speed;
                const sway = Math.sin(t * 0.5 + i * 0.7) * 0.3;
                w.x += sway;

                if (w.y < height * 0.2) {
                    wordsRef.current[i] = createWord(true);
                    continue;
                }

                const normalizedY = (w.y - height * 0.25) / (height * 0.5);
                const positionAlpha = Math.max(0, Math.min(1, normalizedY)) * w.baseAlpha;

                const dx = w.x - mx;
                const dy = w.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 160) {
                    const lensStrength = 1 - dist / 160;
                    const pushX = (dx / Math.max(dist, 1)) * lensStrength * 6;
                    const pushY = (dy / Math.max(dist, 1)) * lensStrength * 6;
                    const glowAlpha = Math.min(0.8, positionAlpha + lensStrength * 0.5);
                    ctx.fillStyle = `rgba(88, 214, 105, ${glowAlpha})`;
                    ctx.fillText(w.word, w.x + pushX, w.y + pushY);
                } else {
                    const noiseVal = simpleNoise(w.x * 0.02, w.y * 0.02, t * 0.3);
                    const finalAlpha = positionAlpha * (0.7 + noiseVal * 0.3);
                    if (finalAlpha > 0.02) {
                        ctx.fillStyle = `rgba(244, 244, 242, ${finalAlpha})`;
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
