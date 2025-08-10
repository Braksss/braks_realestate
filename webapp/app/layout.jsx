import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Costa Brava Pro-Invest",
  description: "L'outil d'analyse et de prospection pour l'immobilier sur la Costa Brava.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-20">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}