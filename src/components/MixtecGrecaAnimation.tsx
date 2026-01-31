import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MixtecGrecaAnimation = () => {
    const [activeNodes, setActiveNodes] = useState<number[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Neural firing simulation
    useEffect(() => {
        const interval = setInterval(() => {
            const count = Math.floor(Math.random() * 4) + 2;
            const nodes = Array.from({ length: count }, () => Math.floor(Math.random() * 12));
            setActiveNodes(nodes);
        }, 400);
        return () => clearInterval(interval);
    }, []);

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / 15;
            const y = (e.clientY - top - height / 2) / 15;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const grecaPath = "M50,350 L50,250 L150,250 L150,150 L250,150 L250,50 L350,50 L350,150 L250,150 L250,250 L150,250 L150,350 L50,350";
    const nodesPos = [
        { x: 50, y: 350 }, { x: 50, y: 250 }, { x: 150, y: 250 },
        { x: 150, y: 150 }, { x: 250, y: 150 }, { x: 250, y: 50 },
        { x: 350, y: 50 }, { x: 350, y: 150 }, { x: 250, y: 150 }, { x: 250, y: 250 },
        { x: 150, y: 250 }, { x: 150, y: 350 }
    ];

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full h-full min-h-[500px] flex items-center justify-center perspective-[1200px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
                scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.4 }}
        >
            {/* Outer Glow Ring */}
            <motion.div
                className="absolute w-[450px] h-[450px] rounded-full border border-primary/20"
                animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            {/* Inner Glow Ring */}
            <motion.div
                className="absolute w-[380px] h-[380px] rounded-full border border-accent-purple/20"
                animate={{
                    rotate: -360,
                }}
                transition={{
                    duration: 25, repeat: Infinity, ease: "linear"
                }}
            />

            {/* Layer 1: Background Echo (Deep Depth) */}
            <motion.div
                className="absolute transition-transform duration-300 ease-out opacity-20 blur-sm"
                style={{
                    transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px) scale(0.85) rotateZ(-5deg)`
                }}
                animate={{
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 4, repeat: Infinity, ease: "easeInOut"
                }}
            >
                <svg viewBox="0 0 400 400" className="w-[400px]">
                    <path d={grecaPath} stroke="#E91E63" strokeWidth="1" fill="none" />
                </svg>
            </motion.div>

            {/* Layer 2: Secondary Echo */}
            <motion.div
                className="absolute transition-transform duration-200 ease-out opacity-30 blur-[2px]"
                style={{
                    transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px) scale(0.92)`
                }}
            >
                <svg viewBox="0 0 400 400" className="w-[400px]">
                    <path d={grecaPath} stroke="#A855F7" strokeWidth="2" fill="none" />
                </svg>
            </motion.div>

            {/* Layer 3: Main Structure (Mid Depth) */}
            <motion.div
                className="relative transition-transform duration-200 ease-out z-10"
                style={{
                    transform: `rotateY(${mousePos.x * 0.6}deg) rotateX(${mousePos.y * -0.6}deg)`
                }}
            >
                <svg viewBox="0 0 400 400" className="w-[450px] drop-shadow-[0_0_40px_rgba(233,30,99,0.5)]">
                    <defs>
                        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E91E63" stopOpacity="1" />
                            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#A855F7" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="30%" stopColor="#00D4FF" stopOpacity="0.8" />
                            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="strongGlow">
                            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background Trace */}
                    <path
                        d={grecaPath}
                        fill="none"
                        stroke="#1A1A2E"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-80"
                    />
                    <path
                        d={grecaPath}
                        fill="none"
                        stroke="#252547"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Main Gradient Path */}
                    <path
                        d={grecaPath}
                        fill="none"
                        stroke="url(#mainGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                    />

                    {/* Pulsing Energy Beam 1 */}
                    <motion.path
                        d={grecaPath}
                        fill="none"
                        stroke="url(#beamGradient)"
                        strokeWidth="6"
                        strokeDasharray="80 420"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        animate={{
                            strokeDashoffset: [0, -500],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Pulsing Energy Beam 2 - Reverse */}
                    <motion.path
                        d={grecaPath}
                        fill="none"
                        stroke="#E91E63"
                        strokeWidth="3"
                        strokeDasharray="40 460"
                        strokeLinecap="round"
                        opacity="0.9"
                        filter="url(#glow)"
                        animate={{
                            strokeDashoffset: [0, 500],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Fast data pulse */}
                    <motion.path
                        d={grecaPath}
                        fill="none"
                        stroke="#00D4FF"
                        strokeWidth="2"
                        strokeDasharray="20 480"
                        strokeLinecap="round"
                        opacity="0.7"
                        animate={{
                            strokeDashoffset: [0, -500],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Connection Nodes */}
                    {nodesPos.map((pos, i) => (
                        <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                            {/* Node Glow Ring */}
                            <motion.circle
                                r="14"
                                fill="none"
                                stroke="#E91E63"
                                strokeWidth="1"
                                opacity="0.3"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.1, 0.3],
                                }}
                                transition={{
                                    duration: 2 + (i % 3) * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Static Node */}
                            <circle r="7" fill="#0F0F1A" stroke="#E91E63" strokeWidth="2" />
                            <circle r="3" fill="#E91E63" opacity="0.8" />

                            {/* Firing Effect */}
                            {activeNodes.includes(i) && (
                                <>
                                    <motion.circle
                                        r="10"
                                        fill="#F59E0B"
                                        filter="url(#strongGlow)"
                                        initial={{ scale: 0, opacity: 1 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <motion.circle
                                        r="5"
                                        fill="#fff"
                                        filter="url(#strongGlow)"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </>
                            )}
                        </g>
                    ))}

                    {/* Central Core */}
                    <foreignObject x="150" y="125" width="100" height="150">
                        <div className="w-full h-full flex items-center justify-center">
                            <motion.div
                                className="relative w-24 h-24 bg-black/60 backdrop-blur-md border border-cta/50 rounded-2xl flex items-center justify-center overflow-hidden"
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(245,158,11,0.3)",
                                        "0 0 40px rgba(245,158,11,0.5)",
                                        "0 0 20px rgba(245,158,11,0.3)",
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                {/* Corner Accents */}
                                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cta" />
                                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cta" />
                                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cta" />
                                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cta" />

                                {/* Scanning Line */}
                                <motion.div
                                    className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cta to-transparent"
                                    animate={{
                                        top: ["0%", "100%", "0%"],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />

                                {/* Content */}
                                <div className="text-center relative z-10">
                                    <motion.span
                                        className="block text-3xl font-black text-white tracking-tighter"
                                        animate={{
                                            textShadow: [
                                                "0 0 10px rgba(233,30,99,0.5)",
                                                "0 0 20px rgba(233,30,99,0.8)",
                                                "0 0 10px rgba(233,30,99,0.5)",
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        MX
                                    </motion.span>
                                    <span className="block text-[10px] text-primary font-mono tracking-wider">AI CORE</span>
                                </div>
                            </motion.div>
                        </div>
                    </foreignObject>
                </svg>
            </motion.div>

            {/* Layer 4: Floating Particles (Front) */}
            <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                    transform: `translate(${mousePos.x * 2.5}px, ${mousePos.y * 2.5}px)`
                }}
            >
                {[
                    { cx: 80, cy: 80, color: "#F59E0B", size: 3, delay: 0 },
                    { cx: 320, cy: 320, color: "#E91E63", size: 4, delay: 0.5 },
                    { cx: 340, cy: 60, color: "#00D4FF", size: 2, delay: 1 },
                    { cx: 60, cy: 340, color: "#A855F7", size: 3, delay: 1.5 },
                    { cx: 200, cy: 30, color: "#F59E0B", size: 2, delay: 0.3 },
                    { cx: 380, cy: 200, color: "#E91E63", size: 2, delay: 0.8 },
                ].map((particle, i) => (
                    <motion.svg
                        key={i}
                        width="400"
                        height="400"
                        viewBox="0 0 400 400"
                        className="absolute top-0 left-0"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: particle.delay,
                        }}
                    >
                        <circle
                            cx={particle.cx}
                            cy={particle.cy}
                            r={particle.size}
                            fill={particle.color}
                            filter="url(#glow)"
                        />
                    </motion.svg>
                ))}
            </motion.div>

            {/* Bottom Status Bar */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs font-mono text-secondary-muted">SYSTEM ONLINE</span>
                <span className="text-xs font-mono text-primary">{Math.floor(Math.random() * 30 + 70)}% EFFICIENCY</span>
            </motion.div>
        </motion.div>
    );
};

export default MixtecGrecaAnimation;
