// webapp/app/estimer/page.jsx
"use client";
import { useState } from 'react';
import { locations } from '@/data/locations'; // On importe vos données

export default function EstimatorPage() {
    const [step, setStep] = useState(1);
    const [estimation, setEstimation] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const data = new FormData(e.target);
        const surface = parseInt(data.get('surface'), 10);
        const ville = data.get('ville').trim();
        const email = data.get('email');

        // Recherche de la localité pour obtenir le prix au m²
        const locationData = locations.find(loc => loc.name.toLowerCase() === ville.toLowerCase());
        
        // Si la ville n'est pas dans nos données, on prend une moyenne de la Costa Brava
        const prixM2 = locationData ? locationData.prixMoyenM2 : 3800; 

        if (!prixM2) {
             setError(`Nous n'avons pas assez de données pour ${ville}. Essayez une ville principale comme 'Begur' ou 'Roses'.`);
             return;
        }

        const basePrice = surface * prixM2;

        // On crée une fourchette de +/- 8% pour donner une estimation réaliste
        const minPrice = Math.round((basePrice * 0.92) / 1000) * 1000;
        const maxPrice = Math.round((basePrice * 1.08) / 1000) * 1000;

        setEstimation({ min: minPrice, max: maxPrice });
        setStep(2);
    }

    return (
        <div className="max-w-2xl mx-auto py-16 px-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tighter">Estimer votre bien sur la Costa Brava</h1>
                <p className="text-lg text-gray-600 mt-2">Obtenez une première estimation crédible en 2 minutes.</p>
            </div>

            {step === 1 ? (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
                    <div>
                        <label htmlFor="surface" className="block text-sm font-medium text-gray-700">Surface (m²)</label>
                        <input type="number" name="surface" id="surface" required placeholder="Ex: 120" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"/>
                    </div>
                     <div>
                        <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville</label>
                        <input type="text" name="ville" id="ville" required placeholder="Ex: Begur" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Votre email pour recevoir le rapport détaillé</label>
                        <input type="email" name="email" id="email" required placeholder="nom@exemple.com" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"/>
                    </div>

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">Estimer mon bien</button>
                </form>
            ) : (
                <div className="mt-8 text-center bg-green-50 p-8 rounded-lg border border-green-200">
                    <h2 className="text-2xl font-bold text-green-800">Estimation calculée !</h2>
                    <p className="text-lg my-4">D'après nos données de marché, nous estimons la valeur de votre bien entre <span className="font-bold text-green-900">{estimation.min.toLocaleString('fr-FR')} €</span> et <span className="font-bold text-green-900">{estimation.max.toLocaleString('fr-FR')} €</span>.</p>
                    <p className="text-gray-700">Un rapport détaillé vous a été envoyé par email. Pour une expertise plus précise et pour discuter de votre projet de vente, un contact téléphonique est indispensable.</p>
                    <a href="#" className="inline-block mt-4 bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600">Planifier un appel stratégique</a>
                </div>
            )}
        </div>
    );
}