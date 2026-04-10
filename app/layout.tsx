import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-serif',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Artesanos Digitales | Huajuapan de León, Oaxaca',
    description:
        'Soluciones digitales hechas a mano desde la Mixteca. Trabajamos con nuestros clientes para construir algo que supere lo esperado.',
    icons: {
        icon: '/logo-ad.jpg',
        apple: '/logo-ad.jpg',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
            <body>{children}</body>
        </html>
    );
}
