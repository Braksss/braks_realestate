// webapp/app/admin/page.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AdminPage.module.css';

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // IMPORTANT: Remplacez ceci par un VRAI système d'authentification en production
        if (password === "votre_mot_de_passe_secret") {
            setError('');
            router.push('/admin/dashboard'); 
        } else {
            setError("Mot de passe incorrect.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Espace Professionnel</h1>
                <p className={styles.subtitle}>Connectez-vous à votre tableau de bord.</p>
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
                        <button type="submit" className={styles.button}>Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    );
}