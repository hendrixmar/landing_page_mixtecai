import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function Contact() {
    const { ref: infoRef, visible: infoVisible } = useReveal(0.2);
    const { ref: formRef, visible: formVisible } = useReveal<HTMLFormElement>(0.15);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interest: 'Desarrollo a Medida',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="contact" id="contact">
            <div className="contact-info" ref={infoRef}>
                <span className={`eyebrow reveal reveal-left ${infoVisible ? 'revealed' : ''}`}>Contacto</span>
                <h2 className={`contact-title serif-display reveal reveal-left reveal-d1 ${infoVisible ? 'revealed' : ''}`}>
                    ¿Listo para crear algo <i>extraordinario?</i>
                </h2>
                <p className={`contact-body reveal reveal-left reveal-d2 ${infoVisible ? 'revealed' : ''}`}>
                    Cada proyecto empieza con una conversación. Cuéntanos qué necesitas y construyamos juntos algo que supere tus expectativas.
                </p>

                <div className={`contact-details reveal reveal-left reveal-d3 ${infoVisible ? 'revealed' : ''}`}>
                    <a href="mailto:hendrikmartina@artesanosdigitalescom.com" className="contact-detail-item">
                        <span className="contact-detail-label">Correo Electrónico</span>
                        <span className="contact-detail-value">hendrikmartina@artesanosdigitalescom.com</span>
                    </a>
                    <a href="https://wa.me/529512389703" className="contact-detail-item">
                        <span className="contact-detail-label">WhatsApp / Teléfono</span>
                        <span className="contact-detail-value">+52 (951) 238-9703</span>
                    </a>
                    <a
                        href="https://maps.app.goo.gl/GBZAKSL58avatS9a9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-detail-item"
                    >
                        <span className="contact-detail-label">Ubicación</span>
                        <span className="contact-detail-value">Huajuapan de León, Santa Teresa, Oaxaca</span>
                    </a>
                </div>

                <div className={`contact-available reveal reveal-left reveal-d4 ${infoVisible ? 'revealed' : ''}`}>
                    <span className="contact-dot" />
                    Disponible para nuevos proyectos
                </div>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <div className={`form-row reveal reveal-up ${formVisible ? 'revealed' : ''}`}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Tu Nombre"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="tucorreo@ejemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={`form-group reveal reveal-up reveal-d1 ${formVisible ? 'revealed' : ''}`}>
                    <label htmlFor="interest">Me interesa...</label>
                    <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                    >
                        <option>Desarrollo a Medida</option>
                        <option>Automatización de Procesos</option>
                        <option>Tienda en Línea</option>
                        <option>App Móvil</option>
                        <option>Consultoría General</option>
                    </select>
                </div>
                <div className={`form-group reveal reveal-up reveal-d2 ${formVisible ? 'revealed' : ''}`}>
                    <label htmlFor="message">Detalles del Proyecto</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="¿Qué quieres construir?"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className={`btn-solid reveal reveal-up reveal-d3 ${formVisible ? 'revealed' : ''}`} style={{ width: '100%', textAlign: 'center' }}>
                    Enviar Mensaje
                </button>
                <p className={`form-privacy reveal reveal-up reveal-d4 ${formVisible ? 'revealed' : ''}`}>Tu información está protegida y nunca será compartida.</p>
            </form>
        </section>
    );
}
