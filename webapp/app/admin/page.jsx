// webapp/app/admin/page.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importer le useRouter
import styles from './AdminPage.module.css';

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Initialiser le router

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (password === "votre_mot_de_passe_secret") {
            setError('');
            // --- MODIFICATION ICI ---
            // Redirige vers le dashboard en cas de succès
            router.push('/dashboard'); 
        } else {
            setError("Mot de passe incorrect.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Accès réservé</h1>
                <p className={styles.subtitle}>
                    Connectez-vous à votre espace de gestion.
                </p>
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="password" className="sr-only">Mot de passe</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                            placeholder="Mot de passe"
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <div>
                        <button type="submit" className={styles.button}>
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}