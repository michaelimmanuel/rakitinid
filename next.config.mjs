/** @type {import('next').NextConfig} */
const nextConfig = {

    eslint: {
        ignoreDuringBuilds: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "booodo6cys6xvh0z.public.blob.vercel-storage.com",
                port: '',
            },
            {
                protocol: 'https',
                hostname: "rakitin-space.sgp1.digitaloceanspaces.com",
                port: ''
            },
            {
                protocol: 'https',
                hostname: "images.prismic.io",
            }
        ],
    },

    reactStrictMode: false,  // turn to false

    experimental: {
        missingSuspenseWithCSRBailout: false,
    },

}




export default nextConfig;
