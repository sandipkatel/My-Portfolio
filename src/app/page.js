import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import VolunteeringSection from '@/components/sections/VolunteeringSection';
import AwardsSection from '@/components/sections/AwardsSection';
import ProjectSection from '@/components/sections/ProjectSection';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="math-divider max-w-6xl m-auto">∑</div>
      <AboutSection />
      <ProjectSection />
      <BlogSection />
      <VolunteeringSection />
      <AwardsSection />
      <ContactSection />
    </>
  );
}
