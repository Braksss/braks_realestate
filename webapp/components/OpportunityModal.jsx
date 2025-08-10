// webapp/components/OpportunityModal.jsx
"use client";

import { useEffect, useState } from 'react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

export function OpportunityModal({ opportunite, onClose }) {
  useLockBodyScroll();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Nouveau lead Acheteur:", { ...data, bien_cible: opportunite.titre });
    setIsSubmitted(true);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative animate-slide-up" 
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-3xl font-light z-10">&times;</button>
        
        <div className="p-8">
          {!isSubmitted ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900">Accès Exclusif</h2>
              <p className="text-gray-600 my-2">
                Vous êtes intéressé par : <strong className="text-orange-600">{opportunite.titre}</strong>.
              </p>
              <p className="text-gray-600 mb-4">
                Pour des raisons de confidentialité, les détails ne sont communiqués qu'aux acheteurs qualifiés. Laissez vos coordonnées pour que je puisse vous contacter personnellement.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Nom</label>
                  <input type="text" name="name" id="name" required placeholder="Votre nom complet" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input type="email" name="email" id="email" required placeholder="Votre email" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Téléphone</label>
                  <input type="tel" name="phone" id="phone" placeholder="Votre téléphone (optionnel)" className="w-full p-2 border rounded-md" />
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600">
                  Demander les informations
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-800">C'est noté !</h2>
              <p className="text-lg text-gray-700 my-4">Merci pour votre intérêt. Je vous recontacterai personnellement dans les 24 heures pour discuter de cette opportunité.</p>
              <button onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300">Fermer</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}