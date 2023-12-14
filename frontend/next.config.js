/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'export',
    basePath:'',
    distDir:'../backend/dist',
    images:{
        unoptimized:true
    },

    async rewrites() {
        return [
            {
                source: '/api/:slug*',
                destination: 'http://localhost:3001/api/:slug*'
            },
        ]
    },
}

module.exports = nextConfig
