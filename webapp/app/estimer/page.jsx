// webapp/app/estimer/page.jsx
"use client";
import { useState } from 'react';

export default function EstimatorPage() {
    const [step, setStep] = useState(1);
    const [estimation, setEstimation] = useState(null);

    // Mettez ici la logique de votre formulaire...
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de calcul simple (à affiner)
        // const data = new FormData(e.target);
        // const price = data.get('surface') * 3500;
        setEstimation({ min: 450000, max: 520000 });
        setStep(2);
    }

    return (
        <div className="max-w-2xl mx-auto py-16 px-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tighter">Estimer votre bien sur la Costa Brava</h1>
                <p className="text-lg text-gray-600 mt-2">Obtenez une première estimation en 2 minutes.</p>
            </div>

            {step === 1 ? (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
                    {/* ... Vos champs de formulaire ici ... */}
                    <div>
                        <label htmlFor="surface" className="block text-sm font-medium text-gray-700">Surface (m²)</label>
                        <input type="number" name="surface" id="surface" required className="w-full p-3 mt-1 border border-gray-300 rounded-lg"/>
                    </div>
                     <div>
                        <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville</label>
                        <input type="text" name="ville" id="ville" required className="w-full p-3 mt-1 border border-gray-300 rounded-lg"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Votre email pour recevoir le rapport</label>
                        <input type="email" name="email" id="email" required className="w-full p-3 mt-1 border border-gray-300 rounded-lg"/>
                    </div>
                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg">Estimer mon bien</button>
                </form>
            ) : (
                <div className="mt-8 text-center bg-green-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-green-800">Estimation calculée !</h2>
                    <p className="text-lg my-4">Nous estimons la valeur de votre bien entre <span className="font-bold">{estimation.min.toLocaleString('fr-FR')} €</span> et <span className="font-bold">{estimation.max.toLocaleString('fr-FR')} €</span>.</p>
                    <p>Un rapport détaillé vous a été envoyé par email. Pour une expertise plus précise, un contact téléphonique est indispensable.</p>
                </div>
            )}
        </div>
    );
}