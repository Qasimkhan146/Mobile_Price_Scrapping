/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com', // Add this domain
      'www.whatmobile.com.pk',
      // Add any other domains you already use
    ],
  },
};

export default nextConfig;
