import { ArrowRight, Code2, Sparkles } from 'lucide-react';
import MixtecGrecaAnimation from './MixtecGrecaAnimation';
import { motion, type Variants } from 'framer-motion';

const Hero = () => {
    // Text animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const letterVariants: Variants = {
        hidden: { opacity: 0, y: 50, rotateX: -90 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };



    return (
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 min-h-screen flex items-center bg-background overflow-hidden relative">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            {/* Floating Orbs Background */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 0.9, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-10 w-96 h-96 bg-accent-magenta/10 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 left-1/3 w-64 h-64 bg-cta/10 rounded-full blur-[80px] pointer-events-none"
            />

            {/* Main Glow Effects */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-magenta/15 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"
            />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Content */}
                    <div className="max-w-3xl">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-cta text-sm font-mono font-semibold tracking-wide mb-8 group cursor-pointer hover:border-primary/60 transition-all duration-300"
                        >
                            <motion.span
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <Sparkles size={16} />
                            </motion.span>
                            <span>ARTESANÍA DIGITAL</span>
                        </motion.div>

                        {/* Main Title with Word Animation */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-4"
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter">
                                <span className="block overflow-hidden">
                                    <motion.span
                                        variants={letterVariants}
                                        className="inline-block mr-4"
                                    >
                                        CREAMOS
                                    </motion.span>
                                    <motion.span
                                        variants={letterVariants}
                                        className="inline-block mr-4"
                                    >
                                        FUTURO
                                    </motion.span>
                                </span>
                                <span className="block overflow-hidden mt-2">
                                    <motion.span
                                        variants={letterVariants}
                                        className="inline-block mr-4 gradient-text"
                                    >
                                        DIGITAL
                                    </motion.span>
                                </span>
                            </h1>
                        </motion.div>

                        {/* Description */}
                        {/* Description - El Gancho */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.4 }}
                            className="mb-12"
                        >
                            <p className="text-lg md:text-2xl text-secondary-muted max-w-2xl font-light leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                                "En el corazón de la Mixteca, un artesano no solo crea un objeto; cuenta una historia con sus manos. Hoy, el mundo ha cambiado, y las herramientas también.
                                <span className="text-white font-medium block mt-4">
                                    Ya no solo tejemos palma o tallamos madera; ahora tejemos algoritmos y le damos forma al código."
                                </span>
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-6"
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white text-lg font-bold overflow-hidden transition-all duration-300"
                                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center">
                                    Iniciar Proyecto
                                    <motion.span
                                        className="ml-2"
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.span>
                                </span>
                            </motion.a>

                            <motion.a
                                href="#services"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border border-secondary/30 text-lg font-bold overflow-hidden transition-all duration-300 hover:border-primary hover:text-primary"
                                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                            >
                                <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center">
                                    <Code2 className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                    Ver Servicios
                                </span>
                            </motion.a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="mt-16 pt-8 border-t border-white/10 grid grid-cols-3 gap-8"
                        >
                            {[
                                { value: "5+", label: "Proyectos" },
                                { value: "98%", label: "Satisfacción" },
                                { value: "24/7", label: "Soporte" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                                    className="text-center"
                                >
                                    <div className="text-2xl md:text-3xl font-black gradient-text">{stat.value}</div>
                                    <div className="text-sm text-secondary-muted mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.3 }}
                        className="hidden lg:flex justify-center w-full mt-24"
                    >
                        <MixtecGrecaAnimation />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
            >
                <span className="text-xs text-secondary-muted font-mono uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2"
                >
                    <motion.div className="w-1.5 h-3 bg-primary rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
