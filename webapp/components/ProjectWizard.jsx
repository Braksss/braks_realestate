"use client";

const FamilyIcon = () => <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>;
const RetireeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.5 12c1.38 0 2.5-1.12 2.5-2.5S17.88 7 16.5 7S14 8.12 14 9.5s1.12 2.5 2.5 2.5M9 11c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3s1.34 3 3 3m7.5 3c-1.83 0-5.5.92-5.5 2.75V18h11v-1.25c0-1.83-3.67-2.75-5.5-2.75M9 13c-2.33 0-7 1.17-7 3.5V18h7v-1.5c0-.83.33-2.33 2.17-3.37c-.97-.24-1.94-.38-2.92-.38"/></svg>;
const InvestorIcon = () => <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22h14v-2H5zm14-4H5v-2h14zm0-4H5v-2h14zm1-4.41L18.59 8 15 11.59 10.41 7 2 15.41l1.41-1.41L10.41 7 15 11.59 20 6.59 21.41 8 20 9.41V4h-6v1.41L12.41 4 11 5.41 6.41 10 5 8.59l1.41-1.42L1.41 2.17 2.83.76l2.18 2.17L6.41 4.34 11 8.59 12.41 7 14 8.41l1.59-1.59L17 8.41l-1.59 1.59L17 11.59l2.59-2.59L21 10.41 20 11.41V10z"/></svg>;

const profiles = [
    { id: 'famille', name: 'Projet Familial', icon: <FamilyIcon /> },
    { id: 'retraite', name: 'Retraite Sereine', icon: <RetireeIcon /> },
    { id: 'investissement', name: 'Investissement', icon: <InvestorIcon /> },
];

export function ProjectWizard({ criteria, onCriteriaChange }) {
    return (
        <div className="p-6 bg-white h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-1 text-gray-900">Analyse de Marché</h2>
            <p className="text-gray-500 mb-6 text-sm">Ajustez les curseurs pour créer votre indice d'opportunité personnalisé.</p>

            {/* Profil */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-800 mb-3">1. Votre profil</label>
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

            {/* Curseur de Priorités */}
            <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">2. Vos priorités</label>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-gray-600">Compatibilité (Projet)</span>
                            <span className="font-bold text-orange-600">{criteria.weights.compatibility}%</span>
                        </div>
                        <input type="range" min="0" max="100" step="5" value={criteria.weights.compatibility} onChange={(e) => onCriteriaChange('weight_compatibility', parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-gray-600">Bonne Affaire (Valeur)</span>
                            <span className="font-bold text-orange-600">{criteria.weights.value}%</span>
                        </div>
                        <input type="range" min="0" max="100" step="5" value={criteria.weights.value} onChange={(e) => onCriteriaChange('weight_value', parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-gray-600">Croissance (Potentiel)</span>
                            <span className="font-bold text-orange-600">{criteria.weights.potential}%</span>
                        </div>
                        <input type="range" min="0" max="100" step="5" value={criteria.weights.potential} onChange={(e) => onCriteriaChange('weight_potential', parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}