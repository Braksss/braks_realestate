// webapp/data/locations.js
// CECI SIMULE VOTRE BASE DE DONNÉES.
// À terme, ce fichier sera remplacé par un appel à votre base (ex: Supabase)
// alimentée par votre scraper.

export const locations = [
  // Exemple de données enrichies pour Begur
  {
    "id": 43,
    "name": "Begur",
    "slug": "begur",
    "image": "https://placehold.co/600x400/e74c3c/ffffff?text=Begur+Vue+Mer",
    "coordinates": [41.954, 3.209],
    "description": "Village iconique perché, réputé pour son château, ses ruelles et ses criques sauvages (Sa Riera, Sa Tuna, Aiguablava).",
    "prixMoyenM2": 4850,
    "evolution5ans": 18,
    "typeDeBienMajoritaire": "Villa avec vue mer",
    "services": ["Plages", "Restaurants gastronomiques", "Patrimoine historique", "Randonnée"],
    "scores": { "famille": 70, "retraite": 85, "investissement": 75 },
    "conseilDeLexpert": "Très forte demande locative saisonnière. Le marché est tendu, les biens de qualité partent vite. Idéal pour un projet patrimonial.",
    "biensDisponibles": [
      { id: 'prop-01', title: "Villa d'architecte vue mer", price: 1250000, surface: 280 }
    ]
  },
  // Exemple pour Roses
  {
    "id": 64,
    "name": "Roses",
    "slug": "roses",
    "image": "https://placehold.co/600x400/3498db/ffffff?text=Baie+de+Roses",
    "coordinates": [42.2631, 3.1831],
    "description": "Grande station balnéaire familiale avec une longue plage de sable, un port de plaisance et une vie animée toute l'année.",
    "prixMoyenM2": 3200,
    "evolution5ans": 12,
    "typeDeBienMajoritaire": "Appartement en front de mer",
    "services": ["Plages", "Sports nautiques", "Commerces", "Vie nocturne"],
    "scores": { "famille": 90, "retraite": 70, "investissement": 85 },
    "conseilDeLexpert": "Excellent potentiel pour l'investissement locatif familial. Moins exclusif que Begur, mais plus accessible et liquide.",
     "biensDisponibles": [
      { id: 'prop-03', title: "Appartement 3 chambres front de mer", price: 480000, surface: 110 }
    ]
  },
];