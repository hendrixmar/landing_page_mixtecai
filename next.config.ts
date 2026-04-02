import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.pexels.com' },
        ],
    },
    serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
