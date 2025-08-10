// webapp/components/StrategyResult.jsx
"use client";

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { locations } from '@/data/locations';
import 'leaflet/dist/leaflet.css';

const StrategyMap = dynamic(() => import('@/components/StrategyMap'), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
});

// Base de données des stratégies
const strategies = {
    // Profil "Investisseur Malin"
    'moyen-revenu-leger': {
        profil: "L'Investisseur Malin",
        strategie: "La Double Frappe Locative.",
        description: "Oubliez la villa de rêve à Begur. Avec votre apport, la stratégie la plus rentable est de diviser votre force de frappe pour acquérir DEUX appartements de 2 chambres à fort potentiel saisonnier. L'effet de levier du crédit vous permettra de contrôler un portefeuille plus important et de générer un cash-flow positif.",
        plan: [
            "Ciblez les Villes-Machines à forte pression locative.",
            "Cherchez des biens à rafraîchir pour créer de la plus-value.",
            "Mandatez un expert pour accéder aux biens qui partent en 48h."
        ],
        zones: ['Lloret de Mar', 'Roses', 'Empuriabrava', 'L\'Estartit']
    },
    // Profil "Patrimonial Serein"
    'eleve-patrimoine-aucun': {
        profil: "Le Bâtisseur Patrimonial",
        strategie: "L'Ancrage de Prestige.",
        description: "Votre objectif est la stabilité et la transmission. La meilleure stratégie est de concentrer votre apport sur UNE seule propriété d'exception dans un secteur ultra-recherché. Vous ne cherchez pas le rendement immédiat, mais la valorisation à long terme et un lieu de rassemblement familial.",
        plan: [
            "Focalisez-vous sur le 'Triangle d'Or' (Begur, Palafrugell, Pals).",
            "Privilégiez les biens avec vue mer ou un charme authentique irréprochable.",
            "Achetez du 'clé en main' pour une tranquillité d'esprit totale."
        ],
        zones: ['Begur', 'Calella de Palafrugell', 'Llafranc', 'Tamariu', 'Sa Riera', 'Sa Tuna']
    },
    // Stratégie par défaut
    default: {
        profil: "L'Explorateur Ambitieux",
        strategie: "Le Coup de Poker Calculé.",
        description: "Votre projet est unique et sort des sentiers battus. La meilleure approche est une analyse sur-mesure pour identifier des opportunités atypiques, comme des terrains à bâtir ou des biens nécessitant une rénovation complète pour libérer un potentiel exceptionnel.",
        plan: [
            "Identifions ensemble les zones émergentes ou les biens délaissés.",
            "Une analyse fine du plan local d'urbanisme (PLU) est nécessaire.",
            "C'est un projet qui nécessite une expertise de terrain pointue."
        ],
        zones: ['Palamós', 'Sant Feliu de Guíxols', 'Cadaqués']
    }
};

export function StrategyResult({ answers, onReset }) {
    const result = useMemo(() => {
        const key = `${answers.apport}-${answers.objectif}-${answers.risque}`;
        return strategies[key] || strategies.default;
    }, [answers]);

    const targetLocations = locations.filter(loc => result.zones.includes(loc.name));

    return (
        <div className="animate-fade-in">
            <button onClick={onReset} className="text-sm font-semibold text-gray-600 hover:text-orange-500 mb-8">
                &larr; Recommencer le diagnostic
            </button>
            
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 text-center mb-8">
                <p className="text-sm font-bold uppercase text-orange-600">Votre Profil</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">{result.profil}</h2>
            </div>

            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-bold mb-2">Votre Stratégie Recommandée : <span className="text-orange-500">{result.strategie}</span></h3>
                    <p className="text-gray-600">{result.description}</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-2">Votre Plan d'Action</h3>
                    <ul className="list-decimal list-inside space-y-2 text-gray-600">
                        {result.plan.map((item, index) => <li key={index}><strong>{item.split(':')[0]}</strong>: {item.split(':')[1]}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-2">Vos Zones de Chasse Prioritaires</h3>
                    <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200 mt-4">
                        <StrategyMap locations={targetLocations} />
                    </div>
                </div>
                 <div className="text-center py-8">
                    <h3 className="text-2xl font-bold">Prêt à passer à l'action ?</h3>
                    <p className="text-gray-600 mt-2 max-w-xl mx-auto">Vous avez la stratégie. J'ai les contacts et l'accès aux biens qui correspondent. Discutons-en.</p>
                    <button className="mt-6 bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-colors">
                        Planifier un appel stratégique gratuit
                    </button>
                </div>
            </div>
        </div>
    );
}