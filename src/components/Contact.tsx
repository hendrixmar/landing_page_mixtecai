import { Mail, MapPin, Phone, Send, ArrowUpRight, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interest: 'Desarrollo a Medida',
        message: ''
    });

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Correo Electrónico",
            value: "hendrikuwabara@gmail.com",
            href: "mailto:hendrikuwabara@gmail.com",
            color: "from-primary to-primary-dark"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "WhatsApp / Teléfono",
            value: "+52 (951) 238-9703",
            href: "https://wa.me/529512389703",
            color: "from-accent-magenta to-primary"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Ubicación",
            value: "Huajuapan de León, Santa Teresa, Oaxaca",
            href: "https://maps.app.goo.gl/GBZAKSL58avatS9a9",
            color: "from-cta to-accent-magenta"
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <section id="contact" className="py-24 bg-surface relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[150px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-accent-magenta/10 rounded-full blur-[150px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {/* Badge */}
                        <motion.span
                            className="inline-flex items-center gap-2 text-primary font-mono font-bold tracking-widest uppercase text-sm mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Clock size={14} />
                            Respuesta en 24 horas
                        </motion.span>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-white mt-3 mb-6">
                            ¿Estás listo para crear algo <span className="gradient-text">EXTRAORDINARIO?</span>
                        </h2>

                        <p className="text-xl text-secondary-muted mb-8 max-w-lg font-light leading-relaxed">
                            "El futuro no tiene por qué ser frío ni genérico. Puede tener alma, historia y propósito.
                            En <strong className="text-primary">Artesanos Digitales</strong>, estamos listos para esculpir el futuro de tu empresa."
                        </p>

                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={index}
                                    href={info.href}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    className="group flex items-center gap-4 p-4 bg-background/50 backdrop-blur-sm border border-white/5 rounded-xl hover:border-primary/30 transition-all duration-300"
                                >
                                    {/* Icon Container */}
                                    <motion.div
                                        className={`p-3 rounded-xl bg-gradient-to-br ${info.color} text-white shadow-lg`}
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {info.icon}
                                    </motion.div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white text-lg group-hover:text-primary transition-colors">
                                            {info.title}
                                        </h4>
                                        <p className="text-secondary-muted">{info.value}</p>
                                    </div>

                                    {/* Arrow */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileHover={{ opacity: 1, x: 0 }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ArrowUpRight className="w-5 h-5 text-primary" />
                                    </motion.div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Availability Indicator */}
                        <motion.div
                            className="mt-8 flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <motion.div
                                className="w-3 h-3 rounded-full bg-green-500"
                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-green-400 font-medium">Disponible para nuevos proyectos</span>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, y: 30 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="relative"
                    >
                        {/* Form Container */}
                        <div className="relative bg-background border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden">
                            {/* Animated Background */}
                            <motion.div
                                className="absolute top-0 right-0 w-64 h-64 bg-cta/10 rounded-full blur-[80px]"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    x: [0, 20, 0],
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px]"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    x: [0, -20, 0],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Form Content */}
                            <form className="space-y-6 relative z-10">
                                {/* Name & Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label htmlFor="name" className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">
                                            Nombre
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                className="w-full px-4 py-3 bg-surface border border-white/10 text-white rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-secondary-muted/50"
                                                placeholder="Tu Nombre"
                                            />
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-cta"
                                                initial={{ width: 0 }}
                                                animate={{ width: focusedField === 'name' ? '100%' : 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <label htmlFor="email" className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                className="w-full px-4 py-3 bg-surface border border-white/10 text-white rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-secondary-muted/50"
                                                placeholder="tucorreo@ejemplo.com"
                                            />
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-cta"
                                                initial={{ width: 0 }}
                                                animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Interest Select */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label htmlFor="interest" className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">
                                        Me interesa...
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="interest"
                                            value={formData.interest}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-surface border border-white/10 text-white rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option className="bg-surface">Desarrollo a Medida</option>
                                            <option className="bg-surface">Automatización IA</option>
                                            <option className="bg-surface">Tienda en Línea</option>
                                            <option className="bg-surface">App Móvil</option>
                                            <option className="bg-surface">Consultoría General</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <motion.div
                                                animate={{ y: [0, 3, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                <ArrowUpRight className="w-5 h-5 text-secondary-muted rotate-90" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Message */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label htmlFor="message" className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">
                                        Detalles del Proyecto
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full px-4 py-3 bg-surface border border-white/10 text-white rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-secondary-muted/50"
                                            placeholder="¿Qué quieres construir?"
                                        />
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-cta rounded-b-lg"
                                            initial={{ width: 0 }}
                                            animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 20px 40px -10px rgba(236, 0, 140, 0.4)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-lg overflow-hidden transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    {/* Shimmer Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        animate={{ x: ["-200%", "200%"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />

                                    <span className="relative z-10 flex items-center gap-2">
                                        Enviar Mensaje
                                        <motion.span
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <Send size={18} />
                                        </motion.span>
                                    </span>
                                </motion.button>

                                {/* Privacy Note */}
                                <motion.p
                                    className="text-center text-sm text-secondary-muted flex items-center justify-center gap-2"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <CheckCircle size={14} className="text-green-500" />
                                    Tu información está protegida y nunca será compartida
                                </motion.p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
