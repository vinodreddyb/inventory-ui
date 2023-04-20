/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: false,
    basePath: process.env.NODE_ENV === 'production' ? '/eiltab' : '',
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '/eiltab' : '',
    }
};

module.exports = nextConfig;
