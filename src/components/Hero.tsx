import { useEffect, useState } from 'react';

export default function Hero() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <header className="hero">
            <div className={`hero-content ${loaded ? 'hero-entered' : ''}`}>
                <div>
                    <span className="eyebrow hero-anim hero-anim-1" style={{ color: 'var(--accent-green)' }}>
                        Huajuapan de León, Oaxaca
                    </span>
                    <h1 className="hero-title hero-anim hero-anim-2">
                        Artesanos <i>Digitales</i>
                    </h1>
                    <p className="meta-text hero-anim hero-anim-3" style={{ maxWidth: 300, marginBottom: 'var(--space-md)' }}>
                        Soluciones digitales hechas a mano. Trabajamos codo a codo con nuestros clientes para construir algo que supere lo esperado.
                    </p>
                    <a href="#contact" className="btn-outline hero-anim hero-anim-4" style={{ color: 'var(--bg-bone)' }}>
                        Iniciar Diálogo
                    </a>
                </div>

                <div className="hero-bottom-meta hero-anim hero-anim-5">
                    <span className="meta-text">EST. 2024</span>
                    <span className="meta-text">LATITUD 17.8058° N</span>
                </div>
            </div>
            <div className={`hero-image-container ${loaded ? 'hero-img-entered' : ''}`}>
                <img
                    src="https://images.pexels.com/photos/5602900/pexels-photo-5602900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Textura artesanal"
                    className="hero-image"
                />
            </div>
            <div className="section-fade-bottom section-fade-dark-to-yellow" />
        </header>
    );
}
