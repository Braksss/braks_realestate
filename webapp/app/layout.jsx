// webapp/app/layout.jsx

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
        
        {/*
          La modification est ici. En appliquant le padding sur une div
          qui englobe tout le contenu, on s'assure que TOUTES les pages,
          y compris le dashboard, respectent cet espacement.
        */}
        <div className="pt-24">
            <main>{children}</main>
        </div>
        
        <Footer />
      </body>
    </html>
  );
}