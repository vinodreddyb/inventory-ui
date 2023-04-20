/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: false,
    basePath: process.env.NODE_ENV === 'production' ? '/eil' : '',
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '/eil' : '',
    }
};

module.exports = nextConfig;
