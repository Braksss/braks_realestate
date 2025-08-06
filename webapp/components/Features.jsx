export function Features() {
    const icons = {
        clipboard: <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path><rect x='8' y='2' width='8' height='4' rx='1' ry='1'></rect></svg>,
        file: <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path><polyline points='14 2 14 8 20 8'></polyline><line x1='16' y1='13' x2='8' y2='13'></line></svg>,
        users: <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path><circle cx='9' cy='7' r='4'></circle><path d='M23 21v-2a4 4 0 0 0-3-3.87'></path></svg>,
    }
    return (
        <section className='py-20 bg-light-gray border-t border-b border-gray-200'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl font-bold tracking-tighter'>Un outil simple, des résultats puissants</h2>
                    <p className='text-lg text-secondary-text max-w-2xl mx-auto mt-4'>Gagnez du temps, évitez les pièges et trouvez la localité qui vous correspond vraiment grâce à notre processus en 3 étapes.</p>
                </div>
                <div className='grid md:grid-cols-3 gap-8'>
                    <div className='bg-white p-8 rounded-xl border border-gray-200'>
                        <div className='bg-orange-100 text-accent w-12 h-12 rounded-full flex items-center justify-center mb-6'>{icons.clipboard}</div>
                        <h3 className='text-xl font-semibold mb-2'>1. Définissez votre projet</h3>
                        <p className='text-secondary-text'>Répondez à quelques questions sur vos rêves et vos critères. Notre assistant intelligent s'occupe du reste.</p>
                    </div>
                    <div className='bg-white p-8 rounded-xl border border-gray-200'>
                        <div className='bg-orange-100 text-accent w-12 h-12 rounded-full flex items-center justify-center mb-6'>{icons.file}</div>
                        <h3 className='text-xl font-semibold mb-2'>2. Recevez votre rapport</h3>
                        <p className='text-secondary-text'>Obtenez un rapport web personnalisé : votre top 3 des villes, les données clés et notre analyse d'expert.</p>
                    </div>
                    <div className='bg-white p-8 rounded-xl border border-gray-200'>
                        <div className='bg-orange-100 text-accent w-12 h-12 rounded-full flex items-center justify-center mb-6'>{icons.users}</div>
                        <h3 className='text-xl font-semibold mb-2'>3. Discutez avec un expert</h3>
                        <p className='text-secondary-text'>Votre rapport est le point de départ idéal pour un appel afin d'affiner votre projet et découvrir des opportunités.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
