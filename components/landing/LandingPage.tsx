'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Manifesto from './Manifesto';
import Problem from './Problem';
import Services from './Services';
import Differentials from './Differentials';
import Portfolio from './Portfolio';
import Testimonials from './Testimonials';
import Editorial from './Editorial';
import ContactCTA from './ContactCTA';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import DiscoveryProvider from '@/components/discovery/DiscoveryProvider';
import DiscoveryOverlay from '@/components/discovery/DiscoveryOverlay';
import { useSnapScroll } from '@/hooks/useSnapScroll';

export default function LandingPage() {
    useSnapScroll();
    const [discoveryOpen, setDiscoveryOpen] = useState(false);

    return (
        <>
            <Navbar />
            <Hero />
            <Manifesto />
            <Problem />
            <Services />
            <Differentials />
            <Portfolio />
            <Testimonials />
            <Editorial />
            <ContactCTA onStartDiscovery={() => setDiscoveryOpen(true)} />
            <Footer />
            <WhatsAppButton />
            <DiscoveryProvider>
                <DiscoveryOverlay open={discoveryOpen} onClose={() => setDiscoveryOpen(false)} />
            </DiscoveryProvider>
        </>
    );
}
