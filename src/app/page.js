import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import DesignsSection from '@/components/sections/DesignsSection';
import VolunteeringSection from '@/components/sections/VolunteeringSection';
import AwardsSection from '@/components/sections/AwardsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="math-divider max-w-6xl m-auto">∑</div>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <DesignsSection />
      <VolunteeringSection />
      <AwardsSection />
      <ContactSection />
    </>
  );
}
