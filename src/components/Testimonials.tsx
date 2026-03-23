import { useReveal } from '../hooks/useReveal';

const testimonials = [
    {
        quote: 'Gracias a Artesanos Digitales, tenemos nuestro sistema de estacionamiento y un punto de venta. El sistema de inventario automatizado nos ahorra horas de trabajo diario.',
        author: 'Frutería La Gran Fruta',
        location: 'Huajuapan de León',
    },
    {
        quote: 'La solución web que implementaron nos ayudó a escalar la captación de clientes y mejorar nuestra administración de las operaciones diarias.',
        author: 'Envíos AD Express',
        location: 'Oaxaca',
    },
];

export default function Testimonials() {
    const { ref: leftRef, visible: leftVisible } = useReveal(0.2);
    const { ref: rightRef, visible: rightVisible } = useReveal(0.15);

    return (
        <section className="testimonials" id="testimonials">
            <div className="testimonials-header" ref={leftRef}>
                <span className={`eyebrow reveal reveal-left ${leftVisible ? 'revealed' : ''}`} style={{ color: 'var(--accent-green)' }}>Testimonios</span>
                <h2 className={`testimonials-title serif-display reveal reveal-left reveal-d1 ${leftVisible ? 'revealed' : ''}`}>
                    "Llevamos la <i>Mixteca</i> al siguiente nivel."
                </h2>
                <div className={`testimonials-founder reveal reveal-left reveal-d2 ${leftVisible ? 'revealed' : ''}`}>
                    <span className="founder-name">Hendrik Martina</span>
                    <span className="meta-text">Fundador, Artesanos Digitales</span>
                </div>
            </div>
            <div className="testimonials-grid" ref={rightRef}>
                {testimonials.map((t, i) => (
                    <div className={`testimonial-card reveal reveal-right reveal-d${i} ${rightVisible ? 'revealed' : ''}`} key={i}>
                        <p className="testimonial-quote">"{t.quote}"</p>
                        <div className="testimonial-author">
                            <span className="testimonial-name">{t.author}</span>
                            <span className="meta-text">{t.location}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="section-fade-bottom section-fade-dark-to-bone" />
        </section>
    );
}
