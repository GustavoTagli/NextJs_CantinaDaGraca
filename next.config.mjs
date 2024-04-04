/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/x-charts'],
  compiler: {styledComponents: true},
  images: {
    domains: ['drive.google.com']
  }
};

export default nextConfig;
