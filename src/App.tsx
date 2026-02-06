import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

function App() {
    return (
        <div className="bg-background min-h-screen selection:bg-primary selection:text-white flex flex-col overflow-x-hidden">
            {/* Background Grid Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10" />
            </div>

            <Navbar />

            <main className="flex-grow relative z-10">
                <Hero />
                <Philosophy />
                <Features />
                <Testimonials />
                <Contact />
            </main>

            {/* Enhanced Footer */}
            <footer className="bg-surface border-t border-white/5 relative overflow-hidden">
                {/* Footer Gradient Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-0 left-1/4 w-96 h-64 bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-accent-magenta/5 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Brand */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="md:col-span-2"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 rounded-xl bg-white overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,174,239,0.6)]">
                                    <img
                                        src="/logos.jpg"
                                        alt="Artesanos Digitales"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-2xl font-black tracking-tighter text-white">
                                    Artesanos <span className="text-primary">Digitales</span>
                                </span>
                            </div>
                            <p className="text-secondary-muted max-w-sm mb-4">
                                Transformando negocios con software y diseño de calidad artesanal. Soluciones digitales hechas a medida.
                            </p>
                            <div className="flex gap-4">
                                {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((social) => (
                                    <motion.a
                                        key={social}
                                        href="#"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-secondary-muted hover:text-primary hover:border-primary/50 transition-colors"
                                    >
                                        <span className="text-xs font-bold">{social[0]}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h4 className="text-white font-bold mb-4">Enlaces</h4>
                            <ul className="space-y-2">
                                {['Servicios', 'Testimonios', 'Contacto'].map((link) => (
                                    <li key={link}>
                                        <motion.a
                                            href={`#${link.toLowerCase()}`}
                                            className="text-secondary-muted hover:text-primary transition-colors text-sm"
                                            whileHover={{ x: 3 }}
                                        >
                                            {link}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h4 className="text-white font-bold mb-4">Contacto</h4>
                            <ul className="space-y-2 text-sm text-secondary-muted">
                                <li>contacto@artesanosdigitales.com</li>
                                <li>+52 (953) 123-4567</li>
                                <li>Huajuapan de León, Oaxaca</li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    />

                    {/* Bottom */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col md:flex-row justify-between items-center gap-4"
                    >
                        <p className="text-secondary-muted/60 text-sm">
                            &copy; {new Date().getFullYear()} Artesanos Digitales Studio. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-secondary-muted/60">
                            <motion.a href="#" whileHover={{ color: '#00AEEF' }} className="transition-colors">Privacidad</motion.a>
                            <motion.a href="#" whileHover={{ color: '#00AEEF' }} className="transition-colors">Términos</motion.a>
                            <motion.a href="#" whileHover={{ color: '#00AEEF' }} className="transition-colors">Cookies</motion.a>
                        </div>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
}

export default App;
