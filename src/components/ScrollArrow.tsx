interface ScrollArrowProps {
    to: string;
    light?: boolean;
}

export default function ScrollArrow({ to, light = false }: ScrollArrowProps) {
    return (
        <a
            href={`#${to}`}
            className={`scroll-arrow ${light ? 'scroll-arrow-light' : ''}`}
            aria-label="Siguiente sección"
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7l6 6 6-6" />
            </svg>
        </a>
    );
}
