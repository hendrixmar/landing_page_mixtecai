import { useReveal } from '../hooks/useReveal';
import ScrollArrow from './ScrollArrow';

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
                Ya no solo tejemos palma o tallamos madera, ahora esculpimos algoritmos y le damos forma al código.
            </p>
            <ScrollArrow to="problem" />
        </section>
    );
}
