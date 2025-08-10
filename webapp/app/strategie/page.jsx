// webapp/app/strategie/page.jsx
"use client";

import { useState } from 'react';
import { DiagnosticWizard } from '@/components/DiagnosticWizard';
import { StrategyResult } from '@/components/StrategyResult';

export default function StrategyPage() {
    const [answers, setAnswers] = useState(null);
    const [isDiagnosed, setIsDiagnosed] = useState(false);

    const handleDiagnosticComplete = (userAnswers) => {
        setAnswers(userAnswers);
        setIsDiagnosed(true);
    };

    const handleReset = () => {
        setIsDiagnosed(false);
        setAnswers(null);
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {!isDiagnosed ? (
                <>
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold tracking-tighter text-gray-900">Le Compas Stratégique</h1>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                            Arrêtez de chercher. Répondez à 3 questions et obtenez un plan d'action d'investissement sur mesure.
                        </p>
                    </div>
                    <DiagnosticWizard onComplete={handleDiagnosticComplete} />
                </>
            ) : (
                <StrategyResult answers={answers} onReset={handleReset} />
            )}
        </div>
    );
}