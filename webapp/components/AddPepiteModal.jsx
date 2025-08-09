// webapp/components/AddPepiteModal.jsx
"use client";

import { useState } from 'react';

export function AddPepiteModal({ onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [type, setType] = useState('contact');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, notes, type });
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[2000] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-800">Ajouter une pépite</h2>
                        <p className="text-sm text-gray-500 mb-6">Enregistrez une information sur le terrain.</p>
                        
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" placeholder="Ex: Contact M. Dupont" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows="3" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Ex: Vendeur potentiel, m'a parlé de son terrain..."></textarea>
                        </div>
                        <div>
                             <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                             <select id="type" value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="contact">Contact</option>
                                <option value="bien-off-market">Bien Off-Market</option>
                                <option value="info-terrain">Info Terrain</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            Annuler
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}