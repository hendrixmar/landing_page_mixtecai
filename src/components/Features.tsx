import { Code, Cpu, ShoppingCart, ShieldCheck, Smartphone, Zap, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

interface ServiceCardProps {
    service: {
        icon: React.ReactNode;
        title: string;
        description: string;
    };
    index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the tilt
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
        stiffness: 300,
        damping: 30
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
        stiffness: 300,
        damping: 30
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-full"
        >
            {/* Card Background with Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent-purple/20 to-cta/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            <div className="relative h-full p-8 bg-surface/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:bg-surface-elevated/80">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>

                {/* Animated Corner Accent */}
                <motion.div
                    className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl"
                    animate={isHovered ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                    } : {}}
                    transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                />

                {/* Icon Container with 3D Effect */}
                <motion.div
                    className="relative mb-6 inline-block"
                    style={{ transform: "translateZ(40px)" }}
                >
                    <motion.div
                        className="p-4 bg-background border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
                        whileHover={{
                            boxShadow: "0 0 30px rgba(233, 30, 99, 0.4)",
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Icon Glow */}
                        <motion.div
                            className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={isHovered ? {
                                scale: [1, 1.2, 1],
                            } : {}}
                            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                        />
                        <motion.div
                            className="relative z-10 text-cta"
                            animate={isHovered ? {
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            {service.icon}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Content with 3D Effect */}
                <div style={{ transform: "translateZ(30px)" }}>
                    <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                            {service.title}
                        </h3>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowUpRight className="w-5 h-5 text-primary" />
                        </motion.div>
                    </div>
                    <p className="text-secondary-muted leading-relaxed font-light">
                        {service.description}
                    </p>
                </div>

                {/* Bottom Accent Line */}
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-cta to-accent-purple"
                    initial={{ width: "0%" }}
                    animate={{ width: isHovered ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                />

                {/* Index Number */}
                <div className="absolute top-4 right-4 text-6xl font-black text-white/5 select-none pointer-events-none">
                    0{index + 1}
                </div>
            </div>
        </motion.div>
    );
};

const Features = () => {
    const services = [
        {
            icon: <Cpu size={32} />,
            title: 'Automatización con IA',
            description: 'Implementamos inteligencia artificial para optimizar tus procesos, ahorrar tiempo y reducir costos operativos.',
        },
        {
            icon: <Code size={32} />,
            title: 'Desarrollo a Medida',
            description: 'Software diseñado específicamente para las necesidades únicas de tu negocio. Sin funcionalidades innecesarias.',
        },
        {
            icon: <Smartphone size={32} />,
            title: 'Digitalización de Procesos',
            description: 'Auditoría de cuellos de botella y desarrollo de software a medida.',
        },
        {
            icon: <ShoppingCart size={32} />,
            title: 'Gestión de Inventarios',
            description: 'Control total de insumos, transformación de materia prima y alertas de caducidad para evitar pérdidas.',
        },
        {
            icon: <ShieldCheck size={32} />,
            title: 'Ciberseguridad',
            description: 'Protegemos la información de tu negocio y tus clientes con estándares de seguridad internacionales.',
        },
        {
            icon: <Zap size={32} />,
            title: 'Modernización Digital',
            description: 'Actualizamos tus sistemas antiguos a tecnologías modernas en la nube, rápidas y altamente disponibles.',
        },
    ];

    return (
        <section id="services" className="py-24 bg-surface relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="mb-16 text-center"
                >
                    <motion.span
                        className="inline-block text-primary font-mono font-bold tracking-widest uppercase text-sm mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Nuestra Especialidad
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-3 mb-6">
                        SOLUCIONES{" "}
                        <span className="gradient-text">FUTURISTAS</span>
                    </h2>
                    <motion.div
                        className="h-1 w-24 bg-gradient-to-r from-primary via-cta to-accent-purple mx-auto rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    <motion.p
                        className="mt-6 text-lg text-secondary-muted max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Transformamos tu visión en realidad digital con tecnología de vanguardia
                    </motion.p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
