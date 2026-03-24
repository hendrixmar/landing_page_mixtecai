import { useEffect, useRef } from 'react';

const DENSITY_CHARS = " .'`^,:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const CHAR_SIZE = 12;

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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;

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
            ctx.font = `${CHAR_SIZE}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const colsCount = Math.ceil(width / CHAR_SIZE);
            const rowsCount = Math.ceil(height / CHAR_SIZE);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const t = timeRef.current;

            for (let y = 0; y < rowsCount; y++) {
                if (y < rowsCount * 0.3) continue;

                for (let x = 0; x < colsCount; x++) {
                    const posX = x * CHAR_SIZE;
                    const posY = y * CHAR_SIZE;
                    const dx = posX - mx;
                    const dy = posY - my;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const normalizedY = (rowsCount - y) / rowsCount;
                    const noiseVal = simpleNoise(x, y, t * 0.5);
                    const mountainHeight =
                        0.3 +
                        Math.sin(x * 0.05 + t * 0.1) * 0.1 +
                        Math.cos(x * 0.2) * 0.05;

                    let char = '';
                    let alpha = 0;

                    if (normalizedY < mountainHeight + noiseVal * 0.1) {
                        const index = Math.floor(
                            Math.abs(noiseVal) * DENSITY_CHARS.length
                        );
                        char = DENSITY_CHARS[index % DENSITY_CHARS.length];
                        alpha = 1 - normalizedY * 2;
                    }

                    if (dist < 150) {
                        const lensStrength = 1 - dist / 150;
                        if (Math.random() > 0.5) {
                            char = Math.random() > 0.5 ? '0' : '1';
                            ctx.fillStyle = `rgba(244, 244, 242, ${lensStrength * 0.9})`;
                        } else {
                            ctx.fillStyle = `rgba(88, 214, 105, ${alpha * 0.6})`;
                        }
                        const shiftX = (dx / dist) * 10 * lensStrength;
                        const shiftY = (dy / dist) * 10 * lensStrength;
                        ctx.fillText(
                            char,
                            posX + CHAR_SIZE / 2 - shiftX,
                            posY + CHAR_SIZE / 2 - shiftY
                        );
                    } else if (char) {
                        ctx.fillStyle = `rgba(244, 244, 242, ${alpha * 0.35})`;
                        ctx.fillText(char, posX + CHAR_SIZE / 2, posY + CHAR_SIZE / 2);
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
