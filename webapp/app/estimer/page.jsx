// webapp/app/estimer/page.jsx
"use client";
import { useState } from 'react';
import { locations } from '@/data/locations';

export default function EstimatorPage() {
    const [step, setStep] = useState(1);
    const [estimation, setEstimation] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const surface = parseInt(data.surface, 10);
        const ville = data.ville.trim();
        
        const locationData = locations.find(loc => loc.name.toLowerCase() === ville.toLowerCase());
        
        // Utilisation d'un prix moyen si la ville n'est pas dans notre BDD principale
        const prixM2 = locationData ? locationData.prixMoyenM2 : 3800; 

        if (!prixM2 || surface <= 0) {
             setError(`Veuillez vérifier les informations. La surface doit être positive.`);
             return;
        }

        const basePrice = surface * prixM2;
        const minPrice = Math.round((basePrice * 0.92) / 1000) * 1000;
        const maxPrice = Math.round((basePrice * 1.08) / 1000) * 1000;

        setEstimation({ min: minPrice, max: maxPrice, ville: ville });
        setStep(2);
        
        // Ici, vous enverriez les données à votre CRM/API
        console.log("Nouveau lead Vendeur:", data);
    }

    return (
        <div className="max-w-2xl mx-auto py-16 px-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tighter">Estimer votre bien sur la Costa Brava</h1>
                <p className="text-lg text-gray-600 mt-2">Recevez une première estimation basée sur les dernières données de marché.</p>
            </div>

            {step === 1 ? (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg border">
                    <div>
                        <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville</label>
                        <input type="text" name="ville" id="ville" required placeholder="Ex: Begur" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"/>
                    </div>
                    <div>
                        <label htmlFor="surface" className="block text-sm font-medium text-gray-700">Surface habitable (m²)</label>
                        <input type="number" name="surface" id="surface" required placeholder="Ex: 120" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Votre email pour recevoir le rapport</label>
                        <input type="email" name="email" id="email" required placeholder="nom@exemple.com" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"/>
                    </div>

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">Obtenir mon estimation</button>
                </form>
            ) : (
                <div className="mt-8 text-center bg-green-50 p-8 rounded-lg border border-green-200 animate-fade-in">
                    <h2 className="text-2xl font-bold text-green-800">Votre estimation est prête !</h2>
                    <p className="text-lg my-4">Pour un bien à <span className="font-bold">{estimation.ville}</span>, nous estimons sa valeur de marché entre :</p>
                    <p className="text-3xl font-bold text-green-900 my-4">{estimation.min.toLocaleString('fr-FR')} € et {estimation.max.toLocaleString('fr-FR')} €</p>
                    <p className="text-gray-700">Cette fourchette est une première approche. Un rapport détaillé vous a été envoyé. Pour une expertise précise, un échange est indispensable.</p>
                    <a href="#" className="inline-block mt-6 bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600">
                        Planifier un appel d'expertise
                    </a>
                </div>
            )}
        </div>
    );
}