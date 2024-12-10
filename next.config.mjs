/** @type {import('next').NextConfig} */
const nextConfig = {

    eslint: {
        ignoreDuringBuilds: true,
    },

    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: "booodo6cys6xvh0z.public.blob.vercel-storage.com",
            port: '',
        }

        ],
    }

    
}




export default nextConfig;
