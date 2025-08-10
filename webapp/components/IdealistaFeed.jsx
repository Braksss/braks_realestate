// webapp/components/IdealistaFeed.jsx
"use client";

// Données de simulation en attendant la connexion à Supabase
const mockProperties = [
    { id: 1, title: "Villa de luxe à Begur", price: "1 200 000 €", surface: "280 m²", link: "#" },
    { id: 2, title: "Appartement avec vue mer à Roses", price: "450 000 €", surface: "90 m²", link: "#" },
    { id: 3, title: "Maison de village à Pals", price: "680 000 €", surface: "150 m²", link: "#" },
    { id: 4, title: "Terrain constructible à Calonge", price: "250 000 €", surface: "800 m²", link: "#" },
    { id: 5, title: "Nouveau projet - Lloret de Mar", price: "320 000 €", surface: "110 m²", link: "#" }
];

export function IdealistaFeed() {
    return (
        <div className="p-4 pt-24 h-full flex flex-col bg-gray-50">
            <h2 className="text-xl font-bold mb-4 flex-shrink-0 text-gray-800">Radar du Marché (Idealista)</h2>
            <div className="flex-grow overflow-y-auto pr-2">
                <div className="space-y-3">
                    {mockProperties.map(prop => (
                        <a href={prop.link} key={prop.id} target="_blank" rel="noopener noreferrer" className="block bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                            <h3 className="font-semibold text-gray-900 truncate">{prop.title}</h3>
                            <div className="flex justify-between text-sm text-gray-600 mt-1">
                                <span className="font-bold text-orange-600">{prop.price}</span>
                                <span>{prop.surface}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}