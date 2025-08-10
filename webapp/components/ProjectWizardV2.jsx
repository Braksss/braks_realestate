// webapp/components/ProjectWizardV2.jsx
"use client";

const profiles = [
    { id: 'famille', name: 'Projet Familial' },
    { id: 'retraite', name: 'Retraite Sereine' },
    { id: 'investissement', name: 'Investissement' },
];

const stylesDeVie = [
    { id: 'Plages', name: 'Pieds dans l\'eau' },
    { id: 'Restaurants gastronomiques', name: 'Vie Gourmande' },
    { id: 'Golfs à proximité', name: 'Sport & Nature' },
    { id: 'Patrimoine historique', name: 'Culture & Calme' },
];

export function ProjectWizardV2({ criteria, onCriteriaChange }) {

    // Fonction unifiée pour mettre à jour n'importe quel champ
    const updateCriteria = (field, value) => {
        onCriteriaChange({ ...criteria, [field]: value });
    };

    const handleStyleChange = (styleId) => {
        const newStyles = criteria.styleDeVie.includes(styleId)
            ? criteria.styleDeVie.filter(s => s !== styleId)
            : [...criteria.styleDeVie, styleId];
        updateCriteria('styleDeVie', newStyles);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-1 text-gray-900">Votre Projet Idéal</h2>
            <p className="text-gray-500 mb-6 text-sm">Affinez votre recherche pour trouver les lieux qui vous ressemblent.</p>

            <div className="mb-6">
                <label className="block text-base font-semibold text-gray-800 mb-3">1. Quel est votre profil ?</label>
                <div className="grid grid-cols-1 gap-2">
                    {profiles.map(p => (
                        <button key={p.id} onClick={() => updateCriteria('profil', p.id)}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${criteria.profil === p.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-400'}`}>
                            <span className={`font-semibold ${criteria.profil === p.id ? 'text-orange-600' : 'text-gray-700'}`}>{p.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-base font-semibold text-gray-800 mb-3">2. Quel style de vie ?</label>
                 <div className="flex flex-wrap gap-2">
                    {stylesDeVie.map(s => (
                        <button key={s.id} onClick={() => handleStyleChange(s.id)}
                            className={`px-3 py-2 text-sm rounded-full border transition-colors ${criteria.styleDeVie.includes(s.id) ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-300 hover:bg-gray-100'}`}>
                            {s.name}
                        </button>
                    ))}
                </div>
            </div>
            
            <div>
                <label htmlFor="budget" className="block text-base font-semibold text-gray-800 mb-3">3. Votre budget approximatif ?</label>
                <div className="text-center">
                    <span className="font-bold text-orange-600 text-2xl tracking-tighter">{criteria.budget.toLocaleString('fr-FR')} €</span>
                </div>
                <input 
                    type="range" 
                    id="budget"
                    min="250000" 
                    max="2000000" 
                    step="50000" 
                    value={criteria.budget} 
                    onChange={(e) => updateCriteria('budget', parseInt(e.target.value, 10))} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500 mt-2" 
                />
            </div>
        </div>
    );
}