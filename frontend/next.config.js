/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
    output:'export',
    basePath:'',
    distDir:'dist',
    images:{
        unoptimized:true
    },

    async rewrites() {
       if(isDev) {
        return [
            {
                source: '/api/:slug*',
                destination: 'http://localhost:3001/api/:slug*'
            },
        ]
       }
       else
       {
        return []
       }
    },
}

module.exports = nextConfig
