// app/layout.js

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
          On applique un padding-top global ici.
          Cela décale TOUT le contenu vers le bas.
        */}
        <main className="pt-24">{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}