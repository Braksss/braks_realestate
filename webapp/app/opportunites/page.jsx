// webapp/app/opportunites/page.jsx
"use client";

import { useState } from 'react';
import { opportunites } from '@/data/opportunites';
import { OpportuniteCard } from '@/components/OpportuniteCard';
import { OpportunityModal } from '@/components/OpportunityModal';

export default function OpportunitesPage() {
    const [selectedOpportunite, setSelectedOpportunite] = useState(null);

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold tracking-tighter mb-4">Le Marché Confidentiel</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Les meilleures opportunités ne sont jamais publiées. Voici un aperçu de ce que mon réseau peut vous proposer.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {opportunites.map(opp => (
                        <OpportuniteCard key={opp.id} opportunite={opp} onClick={() => setSelectedOpportunite(opp)} />
                    ))}
                </div>
            </div>

            {selectedOpportunite && (
                <OpportunityModal 
                    opportunite={selectedOpportunite}
                    onClose={() => setSelectedOpportunite(null)}
                />
            )}
        </>
    );
}