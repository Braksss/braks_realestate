// webapp/pages/api/estimate.js

// Base de données simulée des prix au m² par ville
const priceData = {
  'begur': 4850,
  'roses': 3200,
  'cadaques': 6500,
  'palafrugell': 3500,
  'lloret de mar': 2800,
  'default': 3800 // Prix moyen si la ville n'est pas listée
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { surface, ville } = req.body;

    if (!surface || !ville) {
      return res.status(400).json({ error: 'Surface et ville sont requises.' });
    }

    const normalizedVille = ville.toLowerCase().trim();
    const prixM2 = priceData[normalizedVille] || priceData['default'];

    const basePrice = parseInt(surface, 10) * prixM2;

    // Logique de calcul plus "complexe" pour simuler une vraie API
    const minPrice = Math.round((basePrice * 0.90) / 1000) * 1000;
    const maxPrice = Math.round((basePrice * 1.10) / 1000) * 1000;
    
    // Simule un temps de réponse réseau
    setTimeout(() => {
        res.status(200).json({ min: minPrice, max: maxPrice, usedPricePerSqm: prixM2 });
    }, 500);

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}