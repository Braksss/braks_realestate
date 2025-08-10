// webapp/data/locations.js
// Base de données SIMULÉE. À terme, ces données viendront de votre scraper et de votre propre analyse.
export const locations = [
  {
    "id": 1,
    "name": "Begur",
    "slug": "begur",
    "image": "https://placehold.co/600x400/c0392b/ffffff?text=Begur",
    "coordinates": [41.954, 3.209],
    "description": "Village iconique perché, réputé pour son château, ses ruelles et ses criques sauvages (Sa Riera, Sa Tuna, Aiguablava).",
    "prixMoyenM2": 4850,
    "evolution5ans": 18,
    "opportunityIndex": 88, // Score de 0 à 100
    "typeDeBienMajoritaire": ["Villa", "Maison de village"],
    "services": ["Plages", "Restaurants gastronomiques", "Patrimoine historique", "Randonnée"],
    "styleDeVie": {
      "atouts": ["Charme historique", "Vues mer spectaculaires", "Gastronomie renommée"],
      "inconvenients": ["Accès difficile en été", "Budget élevé"]
    },
    "conseilDeLexpert": "Très forte demande locative saisonnière. Le marché est tendu, les biens de qualité partent vite. Idéal pour un projet patrimonial solide."
  },
  {
    "id": 2,
    "name": "Roses",
    "slug": "roses",
    "image": "https://placehold.co/600x400/2980b9/ffffff?text=Roses",
    "coordinates": [42.263, 3.183],
    "description": "Grande station balnéaire familiale avec une longue plage de sable, un port de plaisance et une vie animée toute l'année.",
    "prixMoyenM2": 3200,
    "evolution5ans": 12,
    "opportunityIndex": 75,
    "typeDeBienMajoritaire": ["Appartement", "Maison"],
    "services": ["Plages", "Sports nautiques", "Commerces", "Vie nocturne"],
    "styleDeVie": {
      "atouts": ["Infrastructures complètes", "Accessibilité", "Large offre de biens"],
      "inconvenients": ["Moins de charme que les villages", "Forte affluence estivale"]
    },
    "conseilDeLexpert": "Excellent potentiel pour l'investissement locatif familial. Moins exclusif que Begur, mais plus accessible et liquide."
  },
  {
    "id": 3,
    "name": "Cadaqués",
    "slug": "cadaques",
    "image": "https://placehold.co/600x400/ecf0f1/34495e?text=Cadaqués",
    "coordinates": [42.288, 3.277],
    "description": "Village d'artistes mythique, isolé au cœur du Cap de Creus. Un charme et une authenticité uniques au monde.",
    "prixMoyenM2": 5500,
    "evolution5ans": 22,
    "opportunityIndex": 92,
    "typeDeBienMajoritaire": ["Maison de village", "Appartement de charme"],
    "services": ["Patrimoine historique", "Galeries d'art", "Randonnée", "Restaurants gastronomiques"],
     "styleDeVie": {
      "atouts": ["Cadre exceptionnel et protégé", "Authenticité préservée", "Forte valeur patrimoniale"],
      "inconvenients": ["Accès difficile", "Marché très fermé et cher"]
    },
    "conseilDeLexpert": "L'investissement passion par excellence. Les biens sont rares et chers, mais leur valeur est décorrélée du marché. Pour les esthètes."
  },
  {
    "id": 4,
    "name": "Pals",
    "slug": "pals",
    "image": "https://placehold.co/600x400/f1c40f/ffffff?text=Pals",
    "coordinates": [41.975, 3.145],
    "description": "Cité médiévale magnifiquement conservée et sa plage immense à quelques kilomètres. Proximité des golfs.",
    "prixMoyenM2": 3600,
    "evolution5ans": 15,
    "opportunityIndex": 82,
    "typeDeBienMajoritaire": ["Maison de village", "Villa avec jardin"],
    "services": ["Golfs à proximité", "Plages", "Patrimoine historique", "Restaurants gastronomiques"],
    "styleDeVie": {
      "atouts": ["Double ambiance village/plage", "Proximité des golfs", "Environnement calme"],
      "inconvenients": ["Séparation physique entre village et plage"]
    },
    "conseilDeLexpert": "Excellent compromis pour ceux qui veulent le charme de la pierre, le golf et la plage. Moins de vues mer directes que Begur."
  },
  {
    "id": 5,
    "name": "Lloret de Mar",
    "slug": "lloret-de-mar",
    "image": "https://placehold.co/600x400/9b59b6/ffffff?text=Lloret+de+Mar",
    "coordinates": [41.700, 2.845],
    "description": "La plus grande et la plus animée des stations balnéaires, connue pour sa vie nocturne mais possédant aussi de belles criques.",
    "prixMoyenM2": 2800,
    "evolution5ans": 9,
    "opportunityIndex": 68,
    "typeDeBienMajoritaire": ["Appartement", "Hôtel"],
    "services": ["Vie nocturne", "Commerces", "Plages", "Sports nautiques"],
    "styleDeVie": {
      "atouts": ["Prix très compétitifs", "Rendement locatif élevé", "Vie toute l'année"],
      "inconvenients": ["Image de tourisme de masse", "Moins familial"]
    },
    "conseilDeLexpert": "Purement pour l'investissement locatif à haut rendement. Il faut bien choisir son quartier pour éviter les nuisances. Potentiel de plus-value limité."
  }
];