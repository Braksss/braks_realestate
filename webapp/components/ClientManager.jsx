// webapp/components/ClientManager.jsx
"use client";
import { useState } from 'react';

export function ClientManager({ clients, onSaveClient }) {
    // ... (le reste du code du composant reste identique) ...

    return (
        // --- MODIFICATION ICI ---
        <div className="p-4 pt-24 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h2 className="text-xl font-bold">Mes Clients</h2>
                <button onClick={handleAddNew} className="text-sm bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600">+</button>
            </div>

            {/* Formulaire d'édition/création */}
            {activeClient && (
                <div className="flex-shrink-0">
                    {/* ... (le contenu du formulaire reste identique) ... */}
                </div>
            )}

            {/* Liste des clients */}
            <div className="flex-grow overflow-y-auto">
                {/* ... (le contenu de la liste reste identique) ... */}
            </div>
        </div>
    );
}

// NOTE : J'ai omis le code interne qui ne change pas pour la clarté. 
// Appliquez simplement la classe "pt-24" au div principal.