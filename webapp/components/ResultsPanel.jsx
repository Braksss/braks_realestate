// webapp/components/ResultsPanel.jsx
import { LocationIdentityCard } from './LocationIdentityCard';

export function ResultsPanel({ locations }) {
    if (locations.length === 0) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-bold text-gray-800">Aucune localité ne correspond parfaitement.</h2>
                <p className="text-gray-600 mt-4 max-w-md">
                    C'est souvent le cas pour les projets uniques. Les meilleures opportunités se trouvent parfois là où les données ne suffisent plus.
                </p>
                <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg mt-8">
                   <h3 className="font-bold text-orange-900 text-lg">C'est ici que mon expertise intervient.</h3>
                   <p className="text-orange-800 my-2">Discutons de votre projet. Je peux vous orienter vers des pépites "off-market" que cet outil ne peut pas voir.</p>
                   <a href="#" className="inline-block mt-4 bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600">
                    Planifier un appel stratégique
                  </a>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Vos Localités Idéales</h1>
            <p className="text-gray-600 mb-6">{locations.length} suggestion(s) pour votre projet.</p>
            <div className="space-y-6">
                {locations.map(loc => (
                    <LocationIdentityCard key={loc.id} location={loc} />
                ))}
            </div>
        </div>
    );
}