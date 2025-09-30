/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},

  images: {
    // keep any remote hosts you use
    domains: ['files.stripe.com'],

    // ✅ allow the qualities you use in <Image quality={...}>
    qualities: [75, 100],

    // optional but recommended
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
