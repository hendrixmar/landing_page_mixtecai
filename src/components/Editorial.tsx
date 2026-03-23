import { useReveal } from '../hooks/useReveal';
import ScrollArrow from './ScrollArrow';

export default function Editorial() {
    const { ref: imgRef, visible: imgVisible } = useReveal(0.15);
    const { ref: contentRef, visible: contentVisible } = useReveal(0.3);

    return (
        <section className="editorial" id="studio">
            <div ref={imgRef} className={`editorial-img-wrap reveal reveal-scale ${imgVisible ? 'revealed' : ''}`}>
                <img
                    src="https://images.pexels.com/photos/4011030/pexels-photo-4011030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Detalle de taller oaxaqueño"
                    className="editorial-image"
                />
            </div>
            <div className="editorial-content" ref={contentRef}>
                <span className={`eyebrow reveal reveal-right ${contentVisible ? 'revealed' : ''}`}>Operaciones Base</span>
                <h2 className={`editorial-title serif-display reveal reveal-right reveal-d1 ${contentVisible ? 'revealed' : ''}`}>
                    El Taller <br />Digital
                </h2>
                <p className={`editorial-body reveal reveal-right reveal-d2 ${contentVisible ? 'revealed' : ''}`}>
                    Ubicados en el corazón de la Mixteca Oaxaqueña, encontramos inspiración en la tradición para construir el futuro. Nuestro taller combina la dedicación del trabajo presencial con el alcance que la tecnología nos permite, siempre cerca de nuestros clientes.
                </p>
                <div className={`reveal reveal-right reveal-d3 ${contentVisible ? 'revealed' : ''}`}>
                    <a href="#" className="btn-solid">Conocer al Equipo</a>
                </div>
            </div>
            <ScrollArrow to="contact" />
        </section>
    );
}
