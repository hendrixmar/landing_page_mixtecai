import { useState } from 'react';
import SealLogo from './SealLogo';

const links = [
    { href: '#ethos', label: 'Ethos' },
    { href: '#services', label: 'Servicios' },
    { href: '#portfolio', label: 'Portafolio' },
    { href: '#testimonials', label: 'Testimonios' },
    { href: '#studio', label: 'Estudio' },
    { href: '#contact', label: 'Contacto' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="site-nav">
                <SealLogo />
                {/* Desktop links */}
                <div className="nav-links nav-desktop">
                    {links.map((l) => (
                        <a key={l.href} href={l.href}>{l.label}</a>
                    ))}
                </div>
                {/* Mobile hamburger */}
                <button
                    className="nav-hamburger"
                    onClick={() => setOpen(!open)}
                    aria-label="Menú"
                >
                    <span className={`hamburger-line ${open ? 'open' : ''}`} />
                    <span className={`hamburger-line ${open ? 'open' : ''}`} />
                </button>
            </nav>

            {/* Mobile fullscreen menu */}
            <div className={`nav-mobile-overlay ${open ? 'active' : ''}`}>
                <div className="nav-mobile-content">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="nav-mobile-link"
                            onClick={() => setOpen(false)}
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
