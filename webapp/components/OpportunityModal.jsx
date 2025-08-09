// webapp/components/OpportunityModal.jsx
"use client";

import { useEffect } from 'react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

function useEscapeKey(callback) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') callback();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [callback]);
}

export function OpportunityModal({ location, bien, onClose }) {
  useEscapeKey(onClose);
  useLockBodyScroll();

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-slide-up" 
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-4xl font-light z-10">&times;</button>
        
        {bien ? (
          <div>
            <img src={bien.image} alt={bien.title} className="w-full h-72 object-cover rounded-t-2xl" />
            <div className="p-8">
              <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Opportunité à {location.name}</p>
              <h2 className="text-3xl font-bold my-2 text-gray-900">{bien.title}</h2>
              <p className="text-2xl text-gray-800 font-light mb-4">{bien.price.toLocaleString('fr-FR')} €</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {bien.atouts.map(atout => <span key={atout} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{atout}</span>)}
              </div>
              <a href="#" className="block w-full text-center bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                Je suis intéressé, organiser une visite
              </a>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold my-2 text-gray-900">Vous avez bon goût ! {location.name} est très demandé.</h2>
            <p className="text-lg text-gray-600 my-4 max-w-lg mx-auto">
              Aucun bien ne correspond publiquement à ce secteur pour le moment. Les meilleures opportunités ("off-market") ne sont jamais affichées en ligne.
            </p>
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg mt-6">
               <h3 className="font-bold text-orange-900 text-lg">Laissez-moi devenir vos yeux sur le marché.</h3>
               <p className="text-orange-800 my-2">Mandatez-moi pour une recherche personnalisée et gratuite. Je vous donnerai accès à mon réseau et aux biens cachés avant tout le monde.</p>
               <a href="#" className="inline-block mt-4 bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors">
                Activer ma recherche personnalisée
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}