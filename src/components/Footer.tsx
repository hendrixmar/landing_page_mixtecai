export default function Footer() {
    return (
        <footer className="site-footer">
            <div>
                <span className="eyebrow">Artesanos Digitales</span>
                <p className="meta-text" style={{ maxWidth: 250, marginTop: 'var(--space-xs)' }}>
                    Huajuapan de León, Oaxaca, México.<br />
                    Codificado a mano.
                </p>
            </div>
            <div style={{ textAlign: 'right' }}>
                <span className="meta-text">&copy; 2024</span>
                <div style={{ marginTop: 'var(--space-xs)' }}>
                    <a href="#" className="meta-text" style={{ textDecoration: 'none', marginLeft: 'var(--space-sm)' }}>
                        LinkedIn
                    </a>
                    <a href="#" className="meta-text" style={{ textDecoration: 'none', marginLeft: 'var(--space-sm)' }}>
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
