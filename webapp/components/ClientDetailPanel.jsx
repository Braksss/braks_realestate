// webapp/components/ClientDetailPanel.jsx
"use client";

import { useState } from 'react';
import styles from './ClientDetailPanel.module.css';

export function ClientDetailPanel({ client, allPepites, onLinkPepite, onClose }) {
    const [selectedPepiteId, setSelectedPepiteId] = useState('');

    if (!client) return null;

    const clientPepiteIds = client.pepiteIds || [];
    const linkedPepites = allPepites.filter(p => clientPepiteIds.includes(p.id));
    const unlinkedPepites = allPepites.filter(p => !clientPepiteIds.includes(p.id));

    const handleLink = () => {
        if (selectedPepiteId) {
            onLinkPepite(client.id, parseInt(selectedPepiteId));
            setSelectedPepiteId('');
        }
    };

    return (
        <aside className={styles.panel}>
            <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <h2 className="text-2xl font-bold">{client.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <div className="mb-6">
                        <h3 className={styles.subtitle}>Budget</h3>
                        <p className={styles.infoText}>{client.budget ? `${Number(client.budget).toLocaleString('fr-FR')} €` : 'Non spécifié'}</p>
                    </div>
                    <div className="mb-6">
                        <h3 className={styles.subtitle}>Notes</h3>
                        <p className={`${styles.infoText} whitespace-pre-wrap`}>{client.notes || 'Aucune note.'}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className={styles.subtitle}>Pépites Associées ({linkedPepites.length})</h3>
                        <div className="space-y-2 mt-2">
                            {linkedPepites.length > 0 ? (
                                linkedPepites.map(pepite => (
                                    <div key={pepite.id} className={styles.pepiteCard}>
                                        <p className="font-bold">{pepite.title}</p>
                                        <p className="text-xs text-gray-600">{pepite.notes}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">Aucune pépite associée.</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="border-t pt-4">
                        <h3 className={styles.subtitle}>Associer une nouvelle pépite</h3>
                        {unlinkedPepites.length > 0 ? (
                            <div className="flex gap-2 mt-2">
                                <select 
                                    value={selectedPepiteId} 
                                    onChange={(e) => setSelectedPepiteId(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                >
                                    <option value="">Choisir une pépite...</option>
                                    {unlinkedPepites.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                                </select>
                                <button onClick={handleLink} className="px-3 bg-orange-500 text-white rounded-md text-sm font-semibold hover:bg-orange-600 flex-shrink-0">Lier</button>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 mt-2">Toutes les pépites sont déjà associées ou aucune pépite n'existe.</p>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}