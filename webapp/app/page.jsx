import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { GuidesSection } from '@/components/GuidesSection';
import { AboutSection } from '@/components/AboutSection';
import { SocialProof } from '@/components/SocialProof';

export default function HomePage() {
  return (
    <>
      <div className="-mt-20">
        <Hero />
      </div>
      <SocialProof />
      <Features />
      <GuidesSection />
      <AboutSection />
    </>
  );
}