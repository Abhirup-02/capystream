import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: 'public',
    fallbacks: {
        document: "/~offline"
    }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io'
            }
        ]
    }
};

export default withPWA({
    nextConfig
});
