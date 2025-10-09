import type { NextConfig } from "next"; 
import path from 'path';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
            },
        ],
    },
    turbopack: {
        root: path.resolve(__dirname, '.'),
    },
};

export default nextConfig;
