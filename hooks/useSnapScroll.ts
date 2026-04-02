'use client';

import { useEffect, useRef } from 'react';

const SECTION_IDS = [
    'hero',
    'ethos',
    'problem',
    'services',
    'differentials',
    'portfolio',
    'testimonials',
    'studio',
    'contact',
    'footer',
];

export function useSnapScroll() {
    const isScrolling = useRef(false);
    const currentIndex = useRef(0);

    useEffect(() => {
        function isMobile() {
            return window.innerWidth <= 1024;
        }

        function getClosestSectionIndex(): number {
            const scrollY = window.scrollY;
            let closest = 0;
            let minDist = Infinity;

            SECTION_IDS.forEach((id, i) => {
                const el = document.getElementById(id);
                if (!el) return;
                const dist = Math.abs(el.offsetTop - scrollY);
                if (dist < minDist) {
                    minDist = dist;
                    closest = i;
                }
            });

            return closest;
        }

        function scrollToIndex(index: number) {
            const clamped = Math.max(0, Math.min(index, SECTION_IDS.length - 1));
            const el = document.getElementById(SECTION_IDS[clamped]);
            if (!el) return;

            isScrolling.current = true;
            currentIndex.current = clamped;

            el.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                isScrolling.current = false;
            }, 800);
        }

        function handleWheel(e: WheelEvent) {
            if (isMobile()) return;
            e.preventDefault();

            if (isScrolling.current) return;

            if (Math.abs(e.deltaY) < 30) return;

            currentIndex.current = getClosestSectionIndex();

            if (e.deltaY > 0) {
                scrollToIndex(currentIndex.current + 1);
            } else {
                scrollToIndex(currentIndex.current - 1);
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (isMobile()) return;
            if (isScrolling.current) return;

            const tag = (e.target as HTMLElement)?.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return;

            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                currentIndex.current = getClosestSectionIndex();
                scrollToIndex(currentIndex.current + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                currentIndex.current = getClosestSectionIndex();
                scrollToIndex(currentIndex.current - 1);
            }
        }

        let touchStartY = 0;

        function handleTouchStart(e: TouchEvent) {
            touchStartY = e.touches[0].clientY;
        }

        function handleTouchEnd(e: TouchEvent) {
            if (isMobile()) return;
            if (isScrolling.current) return;
            const deltaY = touchStartY - e.changedTouches[0].clientY;
            if (Math.abs(deltaY) < 50) return;

            currentIndex.current = getClosestSectionIndex();

            if (deltaY > 0) {
                scrollToIndex(currentIndex.current + 1);
            } else {
                scrollToIndex(currentIndex.current - 1);
            }
        }

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);
}
