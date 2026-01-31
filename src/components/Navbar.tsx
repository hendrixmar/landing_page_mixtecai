import { useState, useEffect } from 'react';
import { Menu, X, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Scroll progress for progress bar
    const { scrollYProgress } = useScroll();
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Determine active section
            const sections = ['services', 'testimonials', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Servicios', href: '#services', id: 'services' },
        { name: 'Impacto', href: '#testimonials', id: 'testimonials' },
        { name: 'Contacto', href: '#contact', id: 'contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 py-3'
                    : 'bg-transparent border-b border-transparent py-5'
                    }`}
            >
                {/* Progress Bar */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-cta to-accent-purple"
                    style={{ width: progressWidth }}
                />

                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        className="flex items-center gap-3 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative">
                            {/* Glow effect */}
                            <motion.div
                                className="absolute -inset-2 bg-primary rounded-full blur-md"
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <img
                                src="/logo.jpg"
                                alt="mixtecAI Logo"
                                className="relative w-10 h-10 rounded-full border-2 border-primary object-cover"
                            />
                            {/* Status indicator */}
                            <motion.div
                                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">
                            mixtec<span className="text-primary">AI</span>
                        </span>
                    </motion.a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className={`relative px-4 py-2 font-medium transition-colors duration-200 uppercase tracking-widest text-sm rounded-lg group ${activeSection === link.id
                                        ? 'text-primary'
                                        : 'text-secondary-muted hover:text-white'
                                    }`}
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                {link.name}
                                {/* Hover indicator */}
                                <motion.div
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "60%" }}
                                    transition={{ duration: 0.2 }}
                                />
                                {/* Active indicator */}
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.a>
                        ))}

                        {/* CTA Button */}
                        <motion.a
                            href="#contact"
                            className="relative ml-6 group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent-purple rounded-lg blur opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                            <div
                                className="relative bg-primary text-white px-6 py-2.5 font-bold text-sm uppercase tracking-wider flex items-center gap-2 overflow-hidden"
                                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                            >
                                <motion.span
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    <Sparkles size={14} />
                                </motion.span>
                                <span>Consultoría Gratis</span>
                            </div>
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden relative w-10 h-10 flex items-center justify-center"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={24} className="text-primary" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={24} className="text-primary" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
                        >
                            <div className="p-6 flex flex-col space-y-2">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`text-lg font-bold uppercase tracking-wider py-3 px-4 rounded-lg transition-colors ${activeSection === link.id
                                                ? 'text-primary bg-primary/10'
                                                : 'text-secondary hover:text-white hover:bg-white/5'
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="#contact"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-4 bg-primary text-white text-center px-6 py-4 font-bold flex items-center justify-center gap-2"
                                    style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Cpu size={18} />
                                    Consultoría Gratis
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default Navbar;
