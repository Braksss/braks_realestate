// webapp/components/LocationIdentityCard.jsx
import Link from 'next/link';
import styles from './LocationIdentityCard.module.css';

export function LocationIdentityCard({ location }) {
    return (
        <div className={styles.card}>
            <div className="md:w-1/3">
                <img src={location.image} alt={location.name} className={styles.image} />
            </div>
            <div className="md:w-2/3 p-6 flex flex-col">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={styles.title}>{location.name}</h3>
                        <p className={styles.description}>{location.description}</p>
                    </div>
                    <div className="text-center ml-4 flex-shrink-0">
                         <p className="text-xs text-orange-600 font-bold uppercase">Match</p>
                         <p className="text-4xl font-bold text-orange-500">{Math.round(location.matchScore)}%</p>
                    </div>
                </div>
                
                <div className="my-4 border-t border-gray-200"></div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Points Forts</h4>
                        <ul className="list-disc list-inside text-gray-600">
                            {location.styleDeVie.atouts.slice(0, 2).map(atout => <li key={atout}>{atout}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Idéal Pour</h4>
                        <p className="text-gray-600">{location.conseilDeLexpert}</p>
                    </div>
                </div>

                <div className="mt-auto pt-4 text-right">
                    <Link href={`/explorateur/map?location=${location.slug}`} className={styles.ctaButton}>
                        Voir sur la carte et analyser
                    </Link>
                </div>
            </div>
        </div>
    );
}