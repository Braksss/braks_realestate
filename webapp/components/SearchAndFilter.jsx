// webapp/components/SearchAndFilter.jsx
import styles from './SearchAndFilter.module.css';

export function SearchAndFilter({ query, onQueryChange, resultsCount }) {
    return (
        <div className={styles.container}>
            <input 
                type="text"
                placeholder="Filtrer les lieux visibles..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                className={styles.searchInput}
            />
            <p className={styles.resultsCount}>{resultsCount} résultat(s) dans la zone</p>
        </div>
    );
}