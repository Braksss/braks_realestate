// webapp/app/explorateur/page.jsx
"use client";

import { useState, useMemo } from 'react';
import { locations as allLocations } from '@/data/locations';
import { ProjectWizardV2 } from '@/components/ProjectWizardV2';
import { ResultsPanel } from '@/components/ResultsPanel';

export default function ExplorerPage() {
  const [criteria, setCriteria] = useState({
    profil: 'famille',
    styleDeVie: [],
    budget: 500000,
  });

  // La logique de filtrage est maintenant plus qualitative
  const filteredLocations = useMemo(() => {
    // 1. Score de profil
    let scored = allLocations.map(loc => ({
      ...loc,
      matchScore: loc.scores[criteria.profil] * 10, // Score de base sur 100
    }));

    // 2. Bonus pour le style de vie
    criteria.styleDeVie.forEach(style => {
      scored.forEach(loc => {
        if (loc.styleDeVie.atouts.includes(style)) {
          loc.matchScore += 20; // On ajoute un bonus pour chaque correspondance
        }
      });
    });

    // 3. Pénalité ou bonus pour le budget
    scored.forEach(loc => {
        const pricePerSqM = loc.prixMoyenM2;
        const typicalPropertySize = 100; // Supposons une propriété type de 100m²
        const estimatedPrice = pricePerSqM * typicalPropertySize;
        const budgetDiff = (criteria.budget - estimatedPrice) / criteria.budget; // Différence en %
        loc.matchScore += budgetDiff * 30; // Ajuste le score en fonction du budget
    });

    // On ne garde que les lieux avec un score positif et on trie
    return scored.filter(loc => loc.matchScore > 50).sort((a, b) => b.matchScore - a.matchScore);

  }, [criteria]);

  return (
    <div className="flex min-h-[calc(100vh-6rem)]">
      {/* Colonne de gauche : L'assistant de projet */}
      <aside className="w-full md:w-1/3 lg:w-1/4 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto bg-white border-r border-gray-200 p-6">
        <ProjectWizardV2
          criteria={criteria}
          onCriteriaChange={setCriteria}
        />
      </aside>
      
      {/* Colonne de droite : Les résultats */}
      <main className="flex-grow p-8 bg-gray-50">
        <ResultsPanel locations={filteredLocations} />
      </main>
    </div>
  );
}