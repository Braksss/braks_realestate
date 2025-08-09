import { guides } from '@/data/guides';
import { GuideCard } from '@/components/GuideCard';
import Link from 'next/link';

export default function GuidesPage() {
  const featuredGuide = guides[0];
  const otherGuides = guides.slice(1);

  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold tracking-tighter mb-4 text-gray-900'>Le Blog de l'Expert</h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Analyses, conseils et secrets d'initiés pour réussir votre projet immobilier sur la Costa Brava.
          </p>
        </div>
        
        {/* Section du guide à la une */}
        {featuredGuide && (
          // --- CORRECTION ICI ---
          // On remplace featuredGuide.url par la construction de l'URL avec le slug
          <Link href={`/guides/${featuredGuide.slug}`} className="group block mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300">
              <div className="overflow-hidden rounded-lg">
                <img src={featuredGuide.image} alt={featuredGuide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div>
                <p className="text-orange-500 font-semibold mb-2">{featuredGuide.category}</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">{featuredGuide.title}</h2>
                <p className="text-gray-600 mb-6">{featuredGuide.excerpt}</p>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
                  <img src={featuredGuide.authorImage} alt={featuredGuide.author} className="w-10 h-10 rounded-full" />
                  <span>Par {featuredGuide.author}</span>
                </div>
              </div>
            </div>
          </Link>
        )}
        
        {/* Grille des autres guides */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {otherGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>
    </div>
  );
}
