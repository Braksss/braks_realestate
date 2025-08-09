import { locations } from '@/data/locations'; // On importe la même source de données

// Cette fonction trouve les données pour un slug spécifique
function getLieuData(slug) {
  const lieu = locations.find((loc) => loc.slug === slug);
  return lieu; // Retourne l'objet complet du lieu
}

// Un composant simple pour afficher les badges de services
function ServiceBadge({ service }) {
  return <span className="inline-block bg-orange-200 text-orange-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">{service}</span>;
}

export default function LieuPage({ params }) {
  const lieu = getLieuData(params.slug);

  // Si aucun lieu ne correspond au slug, on affiche une page d'erreur
  if (!lieu) {
    // Idéalement, utilisez le composant notFound() de Next.js
    return <div>Lieu non trouvé</div>; 
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <img src={lieu.image} alt={`Vue de ${lieu.name}`} className="w-full h-80 object-cover rounded-2xl mb-8 shadow-lg" />
      <h1 className="text-5xl font-bold tracking-tighter mb-4">
        {lieu.name}
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        {lieu.description}
      </p>

      {/* La grille d'informations clés */}
      <div className="grid md:grid-cols-2 gap-6 mb-12 text-center">
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-sm text-gray-500">Prix moyen / m²</p>
          <p className="text-3xl font-bold text-orange-600">{lieu.prixMoyenM2.toLocaleString('fr-FR')} €</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-sm text-gray-500">Évolution sur 5 ans</p>
          <p className="text-3xl font-bold text-orange-600">+{lieu.evolution5ans}%</p>
        </div>
      </div>
      
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Type de bien majoritaire</h3>
        <p className="text-lg text-gray-700">{lieu.typeDeBienMajoritaire}</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4">Services et atouts</h3>
        <div>
          {lieu.services.map(service => <ServiceBadge key={service} service={service} />)}
        </div>
      </div>
    </div>
  );
}