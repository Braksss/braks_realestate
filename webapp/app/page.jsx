// app/page.js

import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { GuidesSection } from '@/components/GuidesSection';
import { AboutSection } from '@/components/AboutSection';

export default function HomePage() {
  return (
    <>
      {/*
        Cette div utilise une marge négative pour "annuler" le pt-24 du layout.
        Le Hero remonte et se place exactement où il doit être.
      */}
      <div className="-mt-24">
        <Hero />
      </div>
      
      {/*
        Les autres sections ne sont pas modifiées et conservent
        l'espacement normal défini par le layout.
      */}
      <Features />
      <GuidesSection />
      <AboutSection />
    </>
  );
}