/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: '/material-estimator/',
  basePath: '/material-estimator',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig