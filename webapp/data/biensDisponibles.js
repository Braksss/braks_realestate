// webapp/data/biensDisponibles.js
export const biensDisponibles = [
  {
    id: 'prop-01',
    locationSlug: 'begur', // Doit correspondre au slug dans locations.js
    title: 'Villa d\'architecte avec vue mer panoramique',
    image: 'https://placehold.co/800x600/2c3e50/ffffff?text=Villa+Begur',
    price: 1250000,
    type: 'Villa',
    bedrooms: 4,
    surface: 280,
    atouts: ['Piscine à débordement', 'Vue mer 180°', 'Prestations luxe']
  },
  {
    id: 'prop-02',
    locationSlug: 'cadaques',
    title: 'Maison de pêcheur rénovée au coeur du village',
    image: 'https://placehold.co/800x600/3498db/ffffff?text=Maison+Cadaques',
    price: 890000,
    type: 'Maison de village',
    bedrooms: 3,
    surface: 150,
    atouts: ['Rénovation de qualité', 'À 2 min du port', 'Charme authentique']
  }
  // Ajoutez d'autres biens ici ou laissez vide pour tester le CTA
];