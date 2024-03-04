/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {styledComponents: true},
  images: {
    domains: ['drive.google.com']
  }
};

export default nextConfig;
