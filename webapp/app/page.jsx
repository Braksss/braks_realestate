import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';       // On va utiliser cette section
import { GuidesSection } from '@/components/GuidesSection'; // Et celle-ci aussi
import { AboutSection } from '@/components/AboutSection';
// Il n'y a plus besoin d'importer ExploreSection ici

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* On remplace "ExploreSection" par "Features" pour expliquer 
        la valeur de votre service dès le début.
      */}
      <Features />
      
      {/* On garde la section des guides, car c'est un excellent 
        outil pour générer de la confiance et des leads.
      */}
      <GuidesSection />
      
      <AboutSection />
      
      {/* Le Footer est géré par le layout, donc pas besoin de l'ajouter ici */}
    </>
  )
}