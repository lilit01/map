/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "maps.googleapis.com"
            }
        ]
    }
};

export default nextConfig;
