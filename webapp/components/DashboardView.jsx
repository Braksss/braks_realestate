
"use client";

import { useState, useEffect } from 'react';
import { ClientManager } from '@/components/ClientManager';
import { ClientDetailPanel } from '@/components/ClientDetailPanel';
import { MarketRadar } from '@/components/MarketRadar';
import { AddPepiteModal } from '@/components/AddPepiteModal';
import dynamic from 'next/dynamic';

// On importe la carte du dashboard de manière dynamique pour éviter les problèmes de rendu serveur
const DashboardMap = dynamic(() => import('@/components/DashboardMap'), { ssr: false });

// Hook simple pour utiliser le Local Storage du navigateur comme une base de données de test
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default function DashboardView({ locations }) {
    // --- GESTION DES DONNÉES (remplacer par une API plus tard) ---
    const [clients, setClients] = useLocalStorage('crm_clients', [
      {id: 1, name: 'Jean Dupont (Exemple)', budget: '1500000', notes: 'Cherche villa vue mer Begur, très réactif.', pepiteIds: [1], status: 'recherche-active'},
      {id: 2, name: 'Marie Curie (Exemple)', budget: '450000', notes: 'Projet d\'investissement locatif à Roses.', pepiteIds: [], status: 'en-contact'},
    ]);
    const [pepites, setPepites] = useLocalStorage('crm_pepites', [
        {id: 1, title: 'Terrain vue mer - Sa Tuna', notes: 'Vendeur pressé, potentiel énorme pour un client premium.', type: 'info-terrain', coordinates: [41.959, 3.224]}
    ]);
    
    // --- GESTION DE L'ÉTAT DE L'INTERFACE ---
    const [selectedClient, setSelectedClient] = useState(null);
    const [modalInfo, setModalInfo] = useState(null);

    // --- FONCTIONS DE GESTION ---
    const handleMapRightClick = (event) => setModalInfo({ latlng: event.latlng });
    
    const handleSaveClient = (clientData) => {
      setClients(currentClients => {
        const isExisting = currentClients.some(c => c.id === clientData.id);
        if (isExisting) {
          // Mise à jour d'un client existant
          return currentClients.map(c => c.id === clientData.id ? clientData : c);
        }
        // Ajout d'un nouveau client
        const newId = currentClients.length > 0 ? Math.max(...currentClients.map(c => c.id)) + 1 : 1;
        const newClient = { ...clientData, id: newId, pepiteIds: [] };
        setSelectedClient(newClient); // Sélectionne le nouveau client après création
        return [...currentClients, newClient];
      });
    };
    
    const handleDeleteClient = (clientId) => {
        if(confirm('Êtes-vous sûr ? Cette action est irréversible.')) {
            setClients(current => current.filter(c => c.id !== clientId));
            if(selectedClient?.id === clientId) setSelectedClient(null);
        }
    };
    
    const handleAddPepite = (pepiteData) => {
        const newId = pepites.length > 0 ? Math.max(...pepites.map(p => p.id)) + 1 : 1;
        const newPepite = { ...pepiteData, id: newId, coordinates: [modalInfo.latlng.lat, modalInfo.latlng.lng] };
        setPepites(current => [...current, newPepite]);
        setModalInfo(null);
        return newPepite; // Retourne la pépite pour pouvoir la lier directement
    };
    
    const handleLinkPepiteToClient = (clientId, pepiteId) => {
        setClients(currentClients => currentClients.map(c => {
            if(c.id === clientId && !c.pepiteIds.includes(pepiteId)) {
                const updatedClient = { ...c, pepiteIds: [...c.pepiteIds, pepiteId] };
                // Met à jour l'état du client sélectionné s'il est visible
                if(selectedClient?.id === clientId) setSelectedClient(updatedClient);
                return updatedClient;
            }
            return c;
        }));
    };

    const handleCreateProspectFromSocial = (socialItem) => {
        const newClient = {
            name: 'Nouveau prospect (Réseaux)',
            budget: '',
            notes: `Source: ${socialItem.source}\nLien: ${socialItem.link}\n\nPost d'origine:\n"${socialItem.content}"`,
            status: 'nouveau'
        };
        handleSaveClient(newClient); 
        alert("Nouveau prospect créé à partir du Radar ! Vous pouvez maintenant l'éditer dans la colonne de gauche.");
    };

    return (
        <>
            <div className="flex h-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-lg">
                {/* Colonne 1: Gestionnaire de Clients */}
                <aside className="w-1/4 h-full border-r overflow-y-auto">
                    <ClientManager 
                        clients={clients} 
                        onSaveClient={handleSaveClient}
                        onDeleteClient={handleDeleteClient}
                        selectedClientId={selectedClient?.id}
                        setSelectedClient={setSelectedClient}
                    />
                </aside>

                {/* Colonne 2: Contenu Central (Carte ou Détail Client) */}
                <main className="w-1/2 h-full relative">
                    {selectedClient ? (
                         <ClientDetailPanel 
                            key={selectedClient.id}
                            client={selectedClient} 
                            allPepites={pepites} 
                            onLinkPepite={handleLinkPepiteToClient}
                            onClose={() => setSelectedClient(null)} 
                        />
                    ) : (
                        <DashboardMap 
                            pepites={pepites}
                            onMapRightClick={handleMapRightClick}
                        />
                    )}
                </main>

                {/* Colonne 3: Radar de Marché */}
                <aside className="w-1/4 h-full border-l overflow-y-auto bg-gray-50">
                    <MarketRadar onCreateProspect={handleCreateProspectFromSocial} />
                </aside>
            </div>

            {/* Modale pour ajouter une pépite */}
            {modalInfo && (
                <AddPepiteModal
                    onClose={() => setModalInfo(null)}
                    onSave={handleAddPepite}
                    clients={clients}
                    onLink={handleLinkPepiteToClient}
                />
            )}
        </>
    );
}