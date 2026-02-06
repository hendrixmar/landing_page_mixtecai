import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {

    return (
        <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
            {/* Animated Background Lines */}
            <motion.div
                className="absolute top-0 left-0 w-full h-px"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </motion.div>
            <motion.div
                className="absolute bottom-0 left-0 w-full h-px"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-accent-magenta/50 to-transparent" />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent-magenta/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Founder Quote */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {/* Quote Icon with Animation */}
                        <motion.div
                            className="mb-8 relative"
                            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(236, 0, 140, 0.2)",
                                        "0 0 40px rgba(236, 0, 140, 0.4)",
                                        "0 0 20px rgba(236, 0, 140, 0.2)",
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center"
                            >
                                <Quote size={40} className="text-primary" />
                            </motion.div>
                        </motion.div>

                        {/* Main Quote */}
                        <motion.h2
                            className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight text-white"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            "LLEVAMOS LA{" "}
                            <motion.span
                                className="gradient-text"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                style={{
                                    backgroundSize: "200% 200%",
                                }}
                            >
                                MIXTECA
                            </motion.span>{" "}
                            AL SIGUIENTE NIVEL DIGITAL."
                        </motion.h2>

                        {/* Founder Info */}
                        <motion.div
                            className="flex items-center space-x-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <motion.div
                                className="w-16 h-16 bg-gradient-to-br from-primary via-accent-magenta to-cta rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-lg"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                            >
                                JR
                            </motion.div>
                            <div>
                                <p className="font-bold text-xl text-white">Hendrik Martina</p>
                                <p className="text-primary font-mono text-sm">Fundador, MixtecAI</p>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >

                        </motion.div>
                    </motion.div>

                    {/* Right Column - Testimonial Cards */}
                    <div className="grid gap-6">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotateY: -15 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                            whileHover={{
                                y: -8,
                                rotateY: 5,
                                boxShadow: "0 25px 50px -12px rgba(236, 0, 140, 0.25)"
                            }}
                            className="group relative bg-surface border border-white/5 p-8 rounded-2xl overflow-hidden transition-all duration-500"
                        >
                            {/* Animated Border */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent-magenta to-cta p-[1px]">
                                    <div className="w-full h-full bg-surface rounded-2xl" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                        >
                                            <Star className="w-5 h-5 fill-cta text-cta" />
                                        </motion.div>
                                    ))}
                                </div>

                                <p className="text-lg text-secondary leading-relaxed mb-6 italic">
                                    "Gracias a Artesanos Digitales, tenemos nuestro sistema de estacionamiento y un punto de venta. El sistema de inventario automatizado nos ahorra horas de trabajo diario."
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="font-bold text-primary group-hover:text-cta transition-colors">
                                        Fruteria La Gran Fruta, Huajuapan
                                    </div>
                                    <motion.div
                                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        whileHover={{ scale: 1.1, rotate: 15 }}
                                    >
                                        <Quote size={16} className="text-primary" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotateY: -15 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                            whileHover={{
                                y: -8,
                                rotateY: 5,
                                boxShadow: "0 25px 50px -12px rgba(236, 0, 140, 0.25)"
                            }}
                            className="group relative bg-surface border border-white/5 p-8 rounded-2xl ml-0 lg:ml-12 overflow-hidden transition-all duration-500"
                        >
                            {/* Animated Border */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-magenta via-primary to-cta p-[1px]">
                                    <div className="w-full h-full bg-surface rounded-2xl" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                        >
                                            <Star className="w-5 h-5 fill-cta text-cta" />
                                        </motion.div>
                                    ))}
                                </div>

                                <p className="text-lg text-secondary leading-relaxed mb-6 italic">
                                    "La solucion web que implementaron, nos ayudo a escalar la captacion de clientes y mejorar nuestra administracion de las operaciones diarias."
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="font-bold text-primary group-hover:text-accent-magenta transition-colors">
                                        Envíos AD Express
                                    </div>
                                    <motion.div
                                        className="w-10 h-10 rounded-full bg-accent-magenta/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        whileHover={{ scale: 1.1, rotate: 15 }}
                                    >
                                        <Quote size={16} className="text-accent-magenta" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-magenta/5 rounded-full blur-3xl group-hover:bg-accent-magenta/10 transition-colors duration-500" />
                        </motion.div>

                        {/* Trust Badge */}
                        <motion.div
                            className="flex items-center justify-center gap-8 mt-4 py-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            {["Google Cloud", "AWS", "Microsoft", "Meta"].map((brand, i) => (
                                <motion.div
                                    key={brand}
                                    className="text-secondary-muted/40 font-bold text-sm hover:text-secondary-muted transition-colors cursor-default"
                                    whileHover={{ scale: 1.1 }}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                >
                                    {brand}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
