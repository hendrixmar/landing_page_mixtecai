import { useCallback, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function useTextScramble(original: string) {
    const [text, setText] = useState(original);
    const rafRef = useRef(0);

    const scramble = useCallback(() => {
        const length = original.length;
        type QueueItem = {
            from: string;
            to: string;
            start: number;
            end: number;
            char?: string;
        };
        const queue: QueueItem[] = [];

        for (let i = 0; i < length; i++) {
            const start = Math.floor(Math.random() * 30);
            const end = start + Math.floor(Math.random() * 30);
            queue.push({
                from: original[i] || '',
                to: original[i] || '',
                start,
                end,
            });
        }

        let frame = 0;
        cancelAnimationFrame(rafRef.current);

        function update() {
            let output = '';
            let complete = 0;

            for (let i = 0; i < queue.length; i++) {
                const item = queue[i];
                if (frame >= item.end) {
                    complete++;
                    output += item.to;
                } else if (frame >= item.start) {
                    if (!item.char || Math.random() < 0.28) {
                        item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                    output += item.char;
                } else {
                    output += item.from;
                }
            }

            setText(output);

            if (complete < queue.length) {
                frame++;
                rafRef.current = requestAnimationFrame(update);
            }
        }

        update();
    }, [original]);

    return { text, scramble };
}
