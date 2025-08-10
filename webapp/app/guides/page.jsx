// webapp/app/guides/page.jsx
import { guides } from '@/data/guides';
import { GuideCard } from '@/components/GuideCard';

export default function GuidesPage() {
  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold tracking-tighter mb-4 text-gray-900'>Le Blog de l'Expert</h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Analyses, conseils et secrets d'initiés pour réussir votre projet immobilier sur la Costa Brava.
          </p>
        </div>
        
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>
    </div>
  );
}