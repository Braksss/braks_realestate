"use client";

const FamilyIcon = () => <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z"/></svg>;
const RetireeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M16.5 12c1.38 0 2.5-1.12 2.5-2.5S17.88 7 16.5 7S14 8.12 14 9.5s1.12 2.5 2.5 2.5M9 11c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3s1.34 3 3 3m7.5 3c-1.83 0-5.5.92-5.5 2.75V18h11v-1.25c0-1.83-3.67-2.75-5.5-2.75M9 13c-2.33 0-7 1.17-7 3.5V18h7v-1.5c0-.83.33-2.33 2.17-3.37c-.97-.24-1.94-.38-2.92-.38"/></svg>;
const InvestorIcon = () => <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22h14v-2H5v2m14-4H5v-2h14v2M5 14h14v-2H5v2m15-4.41L18.59 8L15 11.59L10.41 7L2 15.41L3.41 14L10.41 7L15 11.59L20 6.59L21.41 8L20 9.41V4h-6v1.41L12.41 4L11 5.41L6.41 10L5 8.59L6.41 7.17L1.41 2.17L2.83.76l2.18 2.17L6.41 4.34L11 8.59L12.41 7L14 8.41l1.59-1.59L17 8.41l-1.59 1.59L17 11.59l2.59-2.59L21 10.41L20 11.41V10Z"/></svg>;

export function ExplorerControls({ profile, onProfileChange }) {
  const profiles = [
    { id: 'famille', name: 'Projet Familial', icon: <FamilyIcon /> },
    { id: 'retraite', name: 'Retraite Sereine', icon: <RetireeIcon /> },
    { id: 'investissement', name: 'Investissement Locatif', icon: <InvestorIcon /> },
  ];

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg w-72">
      <h3 className="font-bold text-gray-800 mb-3">Quel est votre projet ?</h3>
      <div className="flex flex-col gap-2">
        {profiles.map(p => (
          <button
            key={p.id}
            onClick={() => onProfileChange(p.id)}
            className={`flex items-center gap-3 p-3 rounded-lg text-sm font-semibold transition-all duration-200 w-full text-left ${
              profile === p.id ? 'bg-orange-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {p.icon} <span>{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
