import { useEffect, useState } from 'react';
import ScrollArrow from './ScrollArrow';
import AsciiCanvas from './AsciiCanvas';
import { useTextScramble } from '../hooks/useTextScramble';

export default function Hero() {
    const [loaded, setLoaded] = useState(false);
    const { text: titleText, scramble: scrambleTitle } = useTextScramble(
        'Artesanos Digitales'
    );

    useEffect(() => {
        const t = setTimeout(() => {
            setLoaded(true);
            scrambleTitle();
        }, 100);
        return () => clearTimeout(t);
    }, [scrambleTitle]);

    return (
        <header className="hero hero-canvas-layout">
            {/* ASCII Canvas Background */}
            <div className="hero-canvas-bg">
                <AsciiCanvas />
            </div>

            {/* Content overlay */}
            <div className={`hero-content hero-content-overlay ${loaded ? 'hero-entered' : ''}`}>
                <div>
                    <span className="eyebrow hero-anim hero-anim-1" style={{ color: 'var(--accent-green)' }}>
                        Huajuapan de León, Oaxaca
                    </span>
                    <h1
                        className="hero-title hero-anim hero-anim-2"
                        onMouseEnter={scrambleTitle}
                        style={{ cursor: 'default' }}
                    >
                        {titleText.split('').map((ch, i) =>
                            // Check if this character is a scramble char
                            '!<>-_\\/[]{}—=+*^?#_'.includes(ch) ? (
                                <span key={i} className="scramble-char">{ch}</span>
                            ) : (
                                <span key={i}>{ch}</span>
                            )
                        )}
                    </h1>
                    <p className="meta-text hero-anim hero-anim-3" style={{ maxWidth: 340, marginBottom: 'var(--space-md)' }}>
                        Soluciones digitales hechas a mano. Trabajamos codo a codo con nuestros clientes para construir algo que supere lo esperado.
                    </p>
                    <a href="#contact" className="btn-outline btn-outline-light hero-anim hero-anim-4">
                        Iniciar Diálogo
                    </a>
                </div>

                <div className="hero-bottom-meta hero-anim hero-anim-5">
                    <span className="meta-text">EST. 2026</span>
                    <span className="meta-text">LATITUD 17.8058° N</span>
                </div>
            </div>

            <ScrollArrow to="ethos" light />
        </header>
    );
}
