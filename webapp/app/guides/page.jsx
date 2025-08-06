export default function GuidesPage() {
  const guides = [
    { title: 'Le guide complet du processus d\'achat', image: 'https://placehold.co/400x250/f1c40f/ffffff?text=Guide+d\'Achat' },
    { title: 'Comprendre la fiscalité immobilière', image: 'https://placehold.co/400x250/9b59b6/ffffff?text=Fiscalité' },
    { title: 'Les 5 pièges à éviter lors d\'un achat', image: 'https://placehold.co/400x250/1abc9c/ffffff?text=Pièges+à+éviter' },
  ];
  return (
    <div className='max-w-6xl mx-auto px-6 py-16'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4'>Nos Guides d'Experts</h1>
        <p className='text-lg text-gray-600'>Cette page affichera la liste des guides récupérés depuis notre CMS.</p>
      </div>
      <div className='grid md:grid-cols-3 gap-8'>
        {guides.map((guide) => (
          <div key={guide.title} className='group'>
            <img src={guide.image} alt={guide.title} className='w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity' />
            <h3 className='text-xl font-semibold group-hover:text-accent transition-colors'>{guide.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
