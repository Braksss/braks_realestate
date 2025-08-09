"use client";

import { useMemo } from 'react';

// Les icônes et les profils restent en dehors, car ils sont statiques
const FamilyIcon = () => <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>;
const RetireeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.5 12c1.38 0 2.5-1.12 2.5-2.5S17.88 7 16.5 7S14 8.12 14 9.5s1.12 2.5 2.5 2.5M9 11c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3s1.34 3 3 3m7.5 3c-1.83 0-5.5.92-5.5 2.75V18h11v-1.25c0-1.83-3.67-2.75-5.5-2.75M9 13c-2.33 0-7 1.17-7 3.5V18h7v-1.5c0-.83.33-2.33 2.17-3.37c-.97-.24-1.94-.38-2.92-.38"/></svg>;
const InvestorIcon = () => <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22h14v-2H5zm14-4H5v-2h14zm0-4H5v-2h14zm1-4.41L18.59 8 15 11.59 10.41 7 2 15.41l1.41-1.41L10.41 7 15 11.59 20 6.59 21.41 8 20 9.41V4h-6v1.41L12.41 4 11 5.41 6.41 10 5 8.59l1.41-1.42L1.41 2.17 2.83.76l2.18 2.17L6.41 4.34 11 8.59 12.41 7 14 8.41l1.59-1.59L17 8.41l-1.59 1.59L17 11.59l2.59-2.59L21 10.41 20 11.41V10z"/></svg>;

const profiles = [
    { id: 'famille', name: 'Projet Familial', icon: <FamilyIcon /> },
    { id: 'retraite', name: 'Retraite Sereine', icon: <RetireeIcon /> },
    { id: 'investissement', name: 'Investissement', icon: <InvestorIcon /> },
];

export function ProjectWizard({ criteria, onCriteriaChange, locations }) {
    
    // --- CORRECTION DÉFINITIVE ET SÉCURISÉE ---
    // On génère la liste des ambiances à partir des données fournies.
    // useMemo garantit que ce calcul n'est fait qu'une seule fois tant que les "locations" ne changent pas.
    const ambiences = useMemo(() => {
        // 1. On vérifie que `locations` est bien un tableau. Si ce n'est pas le cas, on retourne un tableau vide.
        // C'est la sécurité la plus importante qui va empêcher le crash.
        if (!Array.isArray(locations)) {
            return [];
        }
        
        // 2. On parcourt le tableau et on s'assure que chaque élément a la bonne structure avant d'accéder à la propriété.
        const allAmbiences = locations
            .filter(loc => loc && loc.styleDeVie && typeof loc.styleDeVie.ambiance === 'string')
            .map(loc => loc.styleDeVie.ambiance);

        // 3. On retourne une liste unique et triée.
        return [...new Set(allAmbiences)].sort();
    }, [locations]);

    return (
        <div className="p-6 bg-white h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-1 text-gray-900">Votre Projet Idéal</h2>
            <p className="text-gray-500 mb-6 text-sm">Décrivez votre recherche, nous calculons votre score de compatibilité pour chaque ville.</p>

            {/* Étape 1: Profil */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">1. Quel est votre profil ?</label>
                <div className="grid grid-cols-3 gap-2">
                    {profiles.map(p => (
                        <button key={p.id} onClick={() => onCriteriaChange('profil', p.id)}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${criteria.profil === p.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-400'}`}>
                            <div className={`mb-1 ${criteria.profil === p.id ? 'text-orange-500' : 'text-gray-500'}`}>{p.icon}</div>
                            <span className={`text-xs text-center font-semibold ${criteria.profil === p.id ? 'text-orange-600' : 'text-gray-600'}`}>{p.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Étape 2: Budget */}
            <div className="mb-6">
                <label htmlFor="maxPrice" className="block text-sm font-semibold text-gray-800 mb-2">
                    2. Budget maximum par m²
                </label>
                <div className="flex items-center gap-4">
                    <input type="range" id="maxPrice" name="maxPrice" min="2000" max="6000" step="100" value={criteria.maxPrice}
                        onChange={(e) => onCriteriaChange('maxPrice', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    <span className="font-bold text-orange-600 text-sm w-20 text-center">{criteria.maxPrice.toLocaleString('fr-FR')} €</span>
                </div>
            </div>
            
            {/* Étape 3: Ambiance */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">3. Ambiance recherchée</label>
                <select name="ambiance" value={criteria.ambiance}
                    onChange={(e) => onCriteriaChange('ambiance', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500">
                    <option value="toutes">Indifférent</option>
                    {/* La variable `ambiances` est maintenant GARANTIE d'être un tableau, même s'il est vide. */}
                    {/* Le .map() ne plantera plus jamais. */}
                    {ambiances.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </div>
        </div>
    );
}