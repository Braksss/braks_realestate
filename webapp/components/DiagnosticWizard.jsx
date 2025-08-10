// webapp/components/DiagnosticWizard.jsx
"use client";
import { useState } from 'react';
import styles from './DiagnosticWizard.module.css';

export function DiagnosticWizard({ onComplete }) {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        apport: '',
        objectif: '',
        risque: ''
    });

    const handleSelect = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Une fois la dernière question répondue, on transmet les données
            onComplete({ ...answers, [key]: value });
        }
    };

    const questions = [
        {
            key: 'apport',
            title: 'Quelle est votre force de frappe financière ?',
            subtitle: 'Votre apport personnel disponible.',
            options: [
                { value: 'faible', text: 'Moins de 100 000 €' },
                { value: 'moyen', text: '100 000 € à 250 000 €' },
                { value: 'eleve', text: 'Plus de 250 000 €' }
            ]
        },
        {
            key: 'objectif',
            title: 'Quel est l\'objectif principal ?',
            subtitle: 'La finalité de votre investissement.',
            options: [
                { value: 'revenu', text: 'Générer un revenu locatif' },
                { value: 'patrimoine', text: 'Construire un patrimoine familial' },
                { value: 'retraite', text: 'Préparer ma retraite au soleil' }
            ]
        },
        {
            key: 'risque',
            title: 'Quelle est votre tolérance aux travaux ?',
            subtitle: 'Votre implication dans le projet.',
            options: [
                { value: 'aucun', text: 'Clé en main, aucune contrainte' },
                { value: 'leger', text: 'Prêt à rafraîchir pour créer de la valeur' },
                { value: 'eleve', text: 'Une rénovation complète ne me fait pas peur' }
            ]
        }
    ];

    const currentQuestion = questions[step - 1];

    return (
        <div className={styles.wizard}>
            <div className="text-center">
                <p className="text-sm font-semibold text-orange-500">QUESTION {step} SUR 3</p>
                <h2 className={styles.title}>{currentQuestion.title}</h2>
                <p className={styles.subtitle}>{currentQuestion.subtitle}</p>
            </div>
            <div className={styles.optionsGrid}>
                {currentQuestion.options.map(option => (
                    <button 
                        key={option.value} 
                        onClick={() => handleSelect(currentQuestion.key, option.value)}
                        className={styles.optionButton}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
}