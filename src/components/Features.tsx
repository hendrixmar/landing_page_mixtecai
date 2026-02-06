import { HandHeart, Cpu, Fingerprint, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

interface DifferentialCardProps {
    item: {
        icon: React.ReactNode;
        title: string;
        description: string;
        color: string;
    };
    index: number;
}

const DifferentialCard = ({ item, index }: DifferentialCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the tilt
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
        stiffness: 300,
        damping: 30
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
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
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />

            <div className="relative h-full p-10 bg-surface/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:bg-surface-elevated/80 flex flex-col">

                {/* Icon Container */}
                <div className="mb-6 relative">
                    <motion.div
                        className="p-4 bg-background border border-white/10 rounded-2xl shadow-lg inline-block relative overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${item.color}`} />
                        <div className="relative z-10 text-white">
                            {item.icon}
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div style={{ transform: "translateZ(20px)" }} className="flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                    </h3>
                    <p className="text-lg text-secondary-muted leading-relaxed font-light">
                        {item.description}
                    </p>
                </div>

                {/* Bottom Accent */}
                <div className="mt-8 flex items-center gap-2 text-sm font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span>Saber más</span>
                    <ArrowUpRight size={16} />
                </div>
            </div>
        </motion.div>
    );
};

const Features = () => {
    const differentials = [
        {
            icon: <Fingerprint size={40} />,
            title: 'Identidad y Raíz',
            description: 'Llevamos el nombre de nuestra tierra con orgullo, demostrando que desde la Mixteca se exporta inteligencia al mundo.',
            color: "from-primary via-primary-light to-transparent"
        },
        {
            icon: <Cpu size={40} />,
            title: 'Curaduría Tecnológica',
            description: 'A diferencia de las grandes consultoras, nosotros no limitamos tu negocio a que se sujete al software que ofrecen, sino que ponemos el software al servicio de tu negocio.',
            color: "from-cta via-cta-light to-transparent"
        },
        {
            icon: <HandHeart size={40} />,
            title: 'Impacto Social',
            description: 'Al contratarnos, no solo obtienes tecnología de punta, sino que impulsas un ecosistema local que impulsa la adopcion tecnologica de la region.',
            color: "from-accent-magenta via-secondary to-transparent"
        },
    ];

    return (
        <section id="services" className="py-24 bg-surface relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <motion.span
                        className="inline-block text-primary font-mono font-bold tracking-widest uppercase text-sm mb-4"
                    >
                        POR QUÉ NOSOTROS
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mt-3 mb-6">
                        EL <span className="gradient-text">DIFERENCIAL</span>
                    </h2>
                    <p className="text-xl text-secondary-muted max-w-2xl mx-auto font-light">
                        No somos solo desarrolladores. Somos artesanos de la era digital.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {differentials.map((item, index) => (
                        <DifferentialCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
