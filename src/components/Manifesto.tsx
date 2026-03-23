import { useReveal } from '../hooks/useReveal';

export default function Manifesto() {
    const { ref, visible } = useReveal<HTMLElement>(0.2);

    return (
        <section className="manifesto" id="ethos" ref={ref}>
            <span className={`eyebrow reveal reveal-up ${visible ? 'revealed' : ''}`}>Nuestra Filosofía</span>
            <h2 className={`manifesto-statement serif-display reveal reveal-up reveal-d1 ${visible ? 'revealed' : ''}`}>
                <span>Código</span>
                <span>Tejido</span>
            </h2>
            <p className={`manifesto-body reveal reveal-up reveal-d2 ${visible ? 'revealed' : ''}`}>
                Cada línea de código la tratamos como un hilo en un telar. Construimos con paciencia, detalle y el rigor de quien sabe que su trabajo lleva el nombre de su tierra.
            </p>
            <div className="section-fade-bottom section-fade-yellow-to-dark" />
        </section>
    );
}
