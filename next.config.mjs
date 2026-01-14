/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true, // Required for static export
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allow all for demo purposes, restrict in prod
            },
            {
                protocol: 'http',
                hostname: '**',
            }
        ],
    },
    // output: 'export', // Disabled to support API Routes (Proxy)
};

export default nextConfig;
