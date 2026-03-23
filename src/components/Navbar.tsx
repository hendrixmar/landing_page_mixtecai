import SealLogo from './SealLogo';

export default function Navbar() {
    return (
        <nav className="site-nav">
            <SealLogo />
            <div className="nav-links">
                <a href="#ethos">Ethos</a>
                <a href="#services">Servicios</a>
                <a href="#portfolio">Portafolio</a>
                <a href="#studio">Estudio</a>
            </div>
        </nav>
    );
}
