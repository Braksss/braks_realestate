// webapp/components/ClientManager.jsx
"use client";
import { useState } from 'react';

const statusOptions = { 'nouveau': 'Nouveau', 'en-contact': 'En contact', 'recherche-active': 'Recherche active', 'offre-faite': 'Offre faite', 'clos': 'Clos' };
const statusColors = { 'nouveau': 'bg-blue-100 text-blue-800', 'en-contact': 'bg-yellow-100 text-yellow-800', 'recherche-active': 'bg-green-100 text-green-800', 'offre-faite': 'bg-purple-100 text-purple-800', 'clos': 'bg-gray-100 text-gray-800' };

export function ClientManager({ clients, onSaveClient, onDeleteClient, selectedClientId, setSelectedClient }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentClient, setCurrentClient] = useState(null);

    const handleAddNew = () => {
        setCurrentClient({ name: '', budget: '', notes: '', pepiteIds: [], status: 'nouveau' });
        setIsEditing(true);
        setSelectedClient(null); // Désélectionne le client en cours
    };
    
    const handleEdit = (client) => {
        setCurrentClient(client);
        setIsEditing(true);
        setSelectedClient(null); // Désélectionne le client en cours pour afficher le formulaire
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSaveClient(currentClient);
        setIsEditing(false);
        setCurrentClient(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentClient(null);
    }
    
    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h2 className="text-xl font-bold text-gray-800">Mes Clients</h2>
                <button onClick={handleAddNew} className="text-sm bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 font-semibold">+</button>
            </div>

            {isEditing && (
                <form onSubmit={handleSave} className="bg-gray-50 p-4 rounded-lg mb-4 border animate-fade-in">
                    <h3 className="font-bold mb-2 text-gray-700">{currentClient.id ? 'Modifier le client' : 'Nouveau client'}</h3>
                    <input name="name" value={currentClient.name} onChange={e => setCurrentClient({...currentClient, name: e.target.value})} placeholder="Nom du client" required className="w-full p-2 mb-2 border rounded"/>
                    <input name="budget" value={currentClient.budget} onChange={e => setCurrentClient({...currentClient, budget: e.target.value})} placeholder="Budget (€)" type="number" className="w-full p-2 mb-2 border rounded"/>
                    <textarea name="notes" value={currentClient.notes} onChange={e => setCurrentClient({...currentClient, notes: e.target.value})} placeholder="Notes sur le projet..." rows="3" className="w-full p-2 mb-2 border rounded"></textarea>
                    <select name="status" value={currentClient.status} onChange={e => setCurrentClient({...currentClient, status: e.target.value})} className="w-full p-2 mb-3 border rounded">
                        {Object.entries(statusOptions).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                    </select>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={handleCancel} className="text-sm px-3 py-1 border rounded hover:bg-gray-200">Annuler</button>
                        <button type="submit" className="text-sm px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600">Sauvegarder</button>
                    </div>
                </form>
            )}

            <div className="flex-grow overflow-y-auto">
                {clients.map(client => (
                    <div 
                        key={client.id} 
                        onClick={() => {setSelectedClient(client); setIsEditing(false);}} 
                        className={`p-3 mb-2 border rounded-lg cursor-pointer transition-colors ${selectedClientId === client.id ? 'bg-orange-100 border-orange-400' : 'hover:bg-gray-100'}`}
                    >
                        <div className="flex justify-between items-start">
                            <p className="font-bold text-gray-800 pr-2">{client.name}</p>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${statusColors[client.status]}`}>{statusOptions[client.status]}</span>
                        </div>
                        <div className="flex justify-between items-end mt-1">
                           <p className="text-sm text-gray-600">{client.budget ? `${Number(client.budget).toLocaleString('fr-FR')} €` : ''}</p>
                           <button onClick={(e) => { e.stopPropagation(); handleEdit(client); }} className="text-xs text-gray-500 hover:text-orange-600">Éditer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}