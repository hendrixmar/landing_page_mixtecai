import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Hammer, Sparkles, AlertTriangle, Wifi, WifiOff, Users, MapPin } from 'lucide-react';

const Philosophy = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);


    const problemPoints = [
        "Experiencias de usuario fragmentadas",
        "Falta de disponibilidad y caídas críticas",
        "Datos inconsistentes y poco confiables",
        "Sistemas opacos sin insights reales"
    ];

    return (
        <section ref={containerRef} className="relative py-32 bg-background overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* 2. El Problema */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute -left-8 -top-8 text-[120px] font-black text-white/5 leading-none select-none">
                            ?
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">
                            El <span className="text-primary-dark">Problema</span>
                        </h2>
                        <p className="text-lg text-secondary-muted leading-relaxed mb-6">
                            Muchas empresas ven la Inteligencia Artificial como una <span className="text-white font-medium">caja negra fría, compleja y distante</span>.
                            Se pierde el toque humano, la personalización y la identidad.
                        </p>
                        <p className="text-lg text-secondary-muted leading-relaxed">
                            Además, el talento tecnológico suele concentrarse en las grandes ciudades, dejando atrás la
                            <span className="text-primary italic"> riqueza cultural de nuestras regiones.</span>
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {problemPoints.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="flex items-start gap-2 text-sm text-secondary-muted/80"
                                >
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-dark" />
                                    {point}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative h-[400px] rounded-2xl overflow-hidden bg-black border border-white/5"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Disconnected Network Visualization */}
                        <div className="absolute inset-0">
                            {/* Scanline effect */}
                            <motion.div
                                className="absolute left-0 right-0 h-px bg-red-500/30"
                                animate={{ top: ["0%", "100%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />

                            {/* SVG connection lines (broken) */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                                {/* Dashed broken lines between nodes */}
                                <motion.line x1="80" y1="100" x2="200" y2="200" stroke="#ef4444" strokeWidth="1" strokeDasharray="6 6"
                                    animate={{ opacity: [0.2, 0.5, 0.2], strokeDashoffset: [0, 12] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.line x1="320" y1="100" x2="200" y2="200" stroke="#ef4444" strokeWidth="1" strokeDasharray="6 6"
                                    animate={{ opacity: [0.3, 0.1, 0.3], strokeDashoffset: [0, -12] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                />
                                <motion.line x1="80" y1="300" x2="200" y2="200" stroke="#ef4444" strokeWidth="1" strokeDasharray="6 6"
                                    animate={{ opacity: [0.1, 0.4, 0.1], strokeDashoffset: [0, 12] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <motion.line x1="320" y1="300" x2="200" y2="200" stroke="#ef4444" strokeWidth="1" strokeDasharray="6 6"
                                    animate={{ opacity: [0.4, 0.1, 0.4], strokeDashoffset: [0, -12] }}
                                    transition={{ duration: 1.8, repeat: Infinity }}
                                />
                            </svg>

                            {/* Central "Black Box" node */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <motion.div
                                    className="relative w-32 h-32 bg-gray-900 border border-red-500/40 rounded-lg flex items-center justify-center"
                                    animate={{
                                        borderColor: ["rgba(239,68,68,0.4)", "rgba(239,68,68,0.8)", "rgba(239,68,68,0.4)"],
                                        boxShadow: ["0 0 20px rgba(239,68,68,0.1)", "0 0 40px rgba(239,68,68,0.3)", "0 0 20px rgba(239,68,68,0.1)"],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <motion.div
                                        className="text-2xl font-black text-red-500/60 font-mono"
                                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        Software
                                    </motion.div>
                                    <div className="absolute -top-2 -right-2">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            <AlertTriangle size={16} className="text-red-500" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Disconnected outer nodes */}
                            {[
                                { x: "20%", y: "25%", icon: WifiOff, label: "Adaptabilidad", delay: 0 },
                                { x: "80%", y: "25%", icon: Users, label: "Usable Intuitivo", delay: 0.5 },
                                { x: "20%", y: "75%", icon: MapPin, label: "Disponibilidad", delay: 1 },
                                { x: "80%", y: "75%", icon: Wifi, label: "Consistencia", delay: 1.5 },
                            ].map((node, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: node.x, top: node.y }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + node.delay * 0.3, type: "spring" }}
                                >
                                    <motion.div
                                        className="flex flex-col items-center gap-2"
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-gray-900/80 border border-white/10 flex items-center justify-center">
                                            <motion.div
                                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
                                            >
                                                <node.icon size={20} className="text-red-400/70" />
                                            </motion.div>
                                        </div>
                                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">{node.label}</span>
                                    </motion.div>
                                </motion.div>
                            ))}

                            {/* Glitch data streams */}
                            <div className="absolute top-4 left-4 right-4 flex flex-col gap-1 opacity-30">
                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="h-px bg-gradient-to-r from-red-500/60 via-transparent to-red-500/40"
                                        animate={{ scaleX: [0, 1, 0], originX: i % 2 === 0 ? 0 : 1 }}
                                        transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                                    />
                                ))}
                            </div>

                            {/* Error status bar */}
                            <motion.div
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-red-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/20"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <motion.div
                                    className="w-2 h-2 bg-red-500 rounded-full"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">Desconectado</span>
                            </motion.div>

                            {/* Subtle vignette */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
                        </div>
                    </motion.div>
                </div>

                {/* 3. La Solución */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        className="order-2 lg:order-1 relative h-[400px]"
                        style={{ y }}
                    >
                        {/* Visual representation of "Digital Artisan" */}
                        <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-elevated rounded-2xl border border-primary/20 overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,174,239,0.15),transparent_50%)]" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,255,0.15),transparent_50%)]" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <motion.div
                                        className="absolute -inset-4 bg-gradient-to-r from-primary via-cta to-accent-magenta rounded-full blur-xl opacity-40"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    />
                                    <div className="relative bg-black p-8 rounded-2xl border border-white/10 flex gap-8 items-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <Brain size={48} className="text-primary" />
                                            <span className="text-[10px] uppercase tracking-widest text-primary font-mono">Precision</span>
                                        </div>
                                        <div className="h-12 w-px bg-white/20" />
                                        <div className="flex flex-col items-center gap-2">
                                            <Hammer size={48} className="text-secondary" />
                                            <span className="text-[10px] uppercase tracking-widest text-secondary font-mono">Artesanía</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent-magenta" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <Sparkles size={14} />
                            <span>LA SOLUCIÓN</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                            Somos <span className="gradient-text">Artesanos Digitales</span>
                        </h2>

                        <div className="prose prose-invert max-w-none text-secondary-muted space-y-6 text-lg font-light leading-relaxed">
                            <p>
                                Un estudio de innovación tecnológica donde <strong className="text-white">la precisión de la IA se encuentra con la dedicación de la artesanía.</strong>
                            </p>
                            <p>
                                No "producimos en masa" soluciones de software. Diseñamos experiencias de Inteligencia Artificial a la medida, entendiendo el contexto, los valores y la visión única de cada cliente.
                            </p>
                            <div className="bg-surface-elevated/50 p-6 rounded-xl border-l-2 border-primary">
                                <p className="m-0 italic text-white/90">
                                    "Utilizamos tecnología de vanguardia (LLMs, Computer Vision, Automatización) para resolver problemas complejos con la meticulosidad de quien crea una obra de arte."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
