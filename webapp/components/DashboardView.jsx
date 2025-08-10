// webapp/components/DashboardView.jsx
"use client";

import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { locations } from '@/data/locations';
import { MarkersLayer } from '@/components/MarkersLayer';
import { PepitesLayer } from '@/components/PepitesLayer';
import { AddPepiteModal } from '@/components/AddPepiteModal';
import { ClientManager } from '@/components/ClientManager';
import { IdealistaFeed } from '@/components/IdealistaFeed'; // Import du nouveau composant

function MapEvents({ onMapRightClick }) {
  useMapEvents({
    contextmenu: (e) => {
      e.originalEvent.preventDefault(); // Empêche le menu contextuel du navigateur
      onMapRightClick(e);
    },
  });
  return null;
}

export default function DashboardView() {
    const [pepites, setPepites] = useState([]);
    const [clients, setClients] = useState([
        {id: 1, name: 'Jean Dupont', email: 'jean.d@test.com', phone: '0612345678', notes: 'Cherche villa vue mer Begur, budget 1.5M€', searchActive: true},
        {id: 2, name: 'Marie Curie', email: 'marie.c@test.com', phone: '0687654321', notes: 'Investissement locatif Roses/Empuriabrava', searchActive: false},
    ]);
    const [modalInfo, setModalInfo] = useState(null);

    const handleMapRightClick = (event) => {
        setModalInfo({ latlng: event.latlng });
    };

    const handleAddPepite = (pepiteData) => {
        setPepites(currentPepites => [
            ...currentPepites,
            { id: Date.now(), ...pepiteData, coordinates: [modalInfo.latlng.lat, modalInfo.latlng.lng] }
        ]);
        setModalInfo(null);
    };

    const handleSaveClient = (clientData) => {
        setClients(currentClients => {
            const existing = currentClients.find(c => c.id === clientData.id);
            if (existing) {
                return currentClients.map(c => c.id === clientData.id ? clientData : c);
            }
            return [...currentClients, { ...clientData, id: Date.now() }];
        });
    };

    return (
        <>
            {/* Colonne de gauche : Gestion CRM */}
            <aside className="w-1/4 h-full overflow-y-auto bg-white border-r border-gray-200 shadow-lg z-20">
                <ClientManager clients={clients} onSaveClient={handleSaveClient} />
            </aside>

            {/* Colonne centrale : La Carte Interactive */}
            <main className="w-1/2 h-full relative">
                <MapContainer center={[42.02, 3.06]} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0, cursor: 'crosshair' }}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                    <MarkersLayer locations={locations} onZoneClick={() => {}} />
                    <PepitesLayer pepites={pepites} />
                    <MapEvents onMapRightClick={handleMapRightClick} />
                </MapContainer>
            </main>

            {/* Colonne de droite : Le flux du marché */}
            <aside className="w-1/4 h-full overflow-y-auto bg-gray-50 border-l border-gray-200 z-20">
                <IdealistaFeed />
            </aside>

            {modalInfo && (
                <AddPepiteModal
                    onClose={() => setModalInfo(null)}
                    onSave={handleAddPepite}
                />
            )}
        </>
    );
}