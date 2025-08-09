/** @type {import('next').NextConfig} */
const nextConfig = {
  // On ajoute cette section pour autoriser les images venant de sites externes.
  // C'est une mesure de sécurité et d'optimisation de Next.js.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // Si plus tard vous utilisez des images d'Unsplash, par exemple,
      // vous ajouterez un autre objet ici pour 'images.unsplash.com'.
    ],
  },
};

module.exports = nextConfig;