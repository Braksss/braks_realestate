// webapp/components/LocationIdentityCard.jsx
import styles from './LocationIdentityCard.module.css';

export function LocationIdentityCard({ location }) {
    return (
        <div className={styles.card}>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className={styles.title}>{location.name}</h3>
                    <div className="text-center ml-2 flex-shrink-0">
                         <p className="text-xs text-orange-600 font-bold uppercase">Match</p>
                         <p className="text-2xl font-bold text-orange-500">{location.matchScore}%</p>
                    </div>
                </div>
                <p className={styles.description}>{location.description}</p>
            </div>
        </div>
    );
}