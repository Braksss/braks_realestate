// webapp/components/DashboardView.jsx
"use client";

import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { locations } from '@/data/locations';
import { MarkersLayer } from '@/components/MarkersLayer';
import { PepitesLayer } from '@/components/PepitesLayer';
import { AddPepiteModal } from '@/components/AddPepiteModal';
import { ClientManager } from '@/components/ClientManager'; // Nouveau composant CRM

function MapEvents({ onMapRightClick }) {
  useMapEvents({
    contextmenu: (e) => {
      onMapRightClick(e);
    },
  });
  return null;
}

export default function DashboardView() {
    const [pepites, setPepites] = useState([]);
    const [clients, setClients] = useState([]); // Ajout de l'état pour les clients
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
            {/* Panneau latéral pour la gestion CRM */}
            <aside className="w-full md:w-1/3 lg:w-1/4 h-full overflow-y-auto bg-white border-r border-gray-200 shadow-lg z-20">
                <ClientManager clients={clients} onSaveClient={handleSaveClient} />
            </aside>

            <main className="relative flex-grow h-full">
                <MapContainer center={[42.02, 3.06]} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0, cursor: 'crosshair' }}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                    <MarkersLayer locations={locations} onZoneClick={() => {}} />
                    <PepitesLayer pepites={pepites} />
                    <MapEvents onMapRightClick={handleMapRightClick} />
                </MapContainer>
            </main>

            {modalInfo && (
                <AddPepiteModal
                    onClose={() => setModalInfo(null)}
                    onSave={handleAddPepite}
                />
            )}
        </>
    );
}