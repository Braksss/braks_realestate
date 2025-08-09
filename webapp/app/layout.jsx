import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Market Pulse Pro",
  description: "Trouvez les trésors cachés de la Costa Brava.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        {/* --- MODIFICATION ICI --- */}
        {/* On ajoute un padding-top égal à la hauteur de la Navbar (h-24 = 6rem) */}
        <main className>{children}</main>
        
        {/* Le Footer n'est pas utile sur la page de l'explorateur, 
            mais cette structure fonctionnera pour les autres pages.
        */}
      </body>
    </html>
  );
}