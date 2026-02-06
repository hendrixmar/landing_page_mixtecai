import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MixtecGrecaAnimation = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / 20;
            const y = (e.clientY - top - height / 2) / 20;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full h-full min-h-[600px] flex items-center justify-center perspective-[1000px] overflow-visible"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Ambient Glows */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            {/* 3D Container */}
            <motion.div
                className="relative z-10 transform-style-3d"
                style={{
                    transformStyle: 'preserve-3d',
                    rotateX: mousePos.y * -1, // Inverted for natural feel
                    rotateY: mousePos.x,
                }}
                animate={{
                    rotateZ: isHovered ? 5 : 0,
                    scale: isHovered ? 1.05 : 1
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* 3D Logo Construct */}
                <div className="relative w-96 h-96 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>

                    {/* Rotating Rings */}
                    {[1, 2, 3].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 border border-primary/30 rounded-full"
                            style={{
                                borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
                                transformStyle: 'preserve-3d',
                            }}
                            animate={{
                                rotateX: [0, 360],
                                rotateY: [0, 360],
                            }}
                            transition={{
                                duration: 10 + i * 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <div className="absolute top-0 left-1/2 w-3 h-3 bg-cta rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#FFF200]" />
                        </motion.div>
                    ))}

                    {/* Inner Core Rings */}
                    <motion.div
                        className="absolute w-72 h-72 border-2 border-accent-magenta/50 rounded-full"
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{ rotateZ: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute w-60 h-60 border border-t-transparent border-b-transparent border-l-cta border-r-cta rounded-full"
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{ rotateZ: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Central Cube/Logo Container */}
                    <motion.div
                        className="relative w-44 h-44 bg-black/80 backdrop-blur-xl border border-primary/50 flex items-center justify-center rounded-3xl shadow-[0_0_60px_rgba(0,174,239,0.3)]"
                        style={{
                            transform: "translateZ(40px)",
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {/* Shimmer on surface */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-3xl pointer-events-none" />

                        {/* Logo Image */}
                        <motion.div
                            className="w-28 h-28 rounded-2xl overflow-hidden bg-white"
                            style={{ transform: "translateZ(20px)" }}
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(0,174,239,0.3)",
                                    "0 0 40px rgba(0,174,239,0.6)",
                                    "0 0 20px rgba(0,174,239,0.3)",
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <img
                                src="/logos.jpg"
                                alt="Artesanos Digitales"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Floating Tech Bits */}
                        <motion.div
                            className="absolute -top-5 -right-5 w-10 h-10 border-t-2 border-r-2 border-cta"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute -bottom-5 -left-5 w-10 h-10 border-b-2 border-l-2 border-accent-magenta"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom Status Bar */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-6 bg-primary/50"
                            animate={{ height: [12, 24, 12], backgroundColor: ["#00AEEF80", "#FFF20080", "#00AEEF80"] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        />
                    ))}
                </div>
                <span className="text-xs font-mono text-white tracking-widest">SYSTEM ONLINE</span>
            </motion.div>
        </motion.div>
    );
};

export default MixtecGrecaAnimation;
