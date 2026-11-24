import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { WorkProcess } from './components/WorkProcess';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SERVICES } from './data/services';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].title);
  const [projectContext, setProjectContext] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.history.replaceState(
        null,
        '',
        `/moses-joseph-skool-expert${window.location.search}${window.location.hash}`
      );
    }
  }, []);

  const handleInquireProject = (serviceTitle: string, projectName: string) => {
    setSelectedService(serviceTitle);
    setProjectContext(projectName);
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#071426] text-white">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#1677FF] focus:text-white focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        <Navbar />

        <main>
          <Hero />
          <About />
          <Services onSelectService={(service) => setSelectedService(service)} />
          <Portfolio onInquireProject={handleInquireProject} />
          <WhyWorkWithMe />
          <WorkProcess />
          <Testimonials />
          <Contact preselectedService={selectedService} projectContext={projectContext} />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
