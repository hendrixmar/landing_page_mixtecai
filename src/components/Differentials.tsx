import { useReveal } from '../hooks/useReveal';
import ScrollArrow from './ScrollArrow';

const items = [
    {
        number: '01',
        title: 'Identidad y Raíz',
        description:
            'Llevamos el nombre de nuestra tierra con orgullo. Desde la Mixteca demostramos que aquí se construye trabajo de clase mundial.',
    },
    {
        number: '02',
        title: 'Tu Negocio Primero',
        description:
            'No te adaptamos a nuestro software. Nosotros nos adaptamos a tu negocio. Cada solución nace de entender tu operación, tus clientes y tu visión.',
    },
    {
        number: '03',
        title: 'Crecimiento Compartido',
        description:
            'Tu éxito es nuestro éxito. No solo entregamos un proyecto — nos convertimos en tu socio tecnológico y crecemos contigo a largo plazo.',
    },
];

export default function Differentials() {
    const { ref: headerRef, visible: headerVisible } = useReveal(0.3);
    const { ref: gridRef, visible: gridVisible } = useReveal(0.1);

    return (
        <section className="differentials" id="differentials">
            <div ref={headerRef}>
                <span className={`eyebrow reveal reveal-up ${headerVisible ? 'revealed' : ''}`}>Por Qué Nosotros</span>
                <h2 className={`differentials-heading serif-display reveal reveal-up reveal-d1 ${headerVisible ? 'revealed' : ''}`}>
                    El <i>Diferencial</i>
                </h2>
                <p className={`differentials-subtitle reveal reveal-up reveal-d2 ${headerVisible ? 'revealed' : ''}`}>
                    No somos solo desarrolladores. Somos artesanos comprometidos con tu crecimiento.
                </p>
            </div>
            <div className="differentials-grid" ref={gridRef}>
                {items.map((item, i) => (
                    <div className={`differential-card reveal reveal-up reveal-d${i} ${gridVisible ? 'revealed' : ''}`} key={item.number}>
                        <span className="differential-number">{item.number}</span>
                        <h3 className="differential-title serif-display">{item.title}</h3>
                        <p className="differential-desc">{item.description}</p>
                    </div>
                ))}
            </div>
            <ScrollArrow to="portfolio" />
        </section>
    );
}
