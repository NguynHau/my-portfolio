import React, { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import BackgroundEffect from './components/BackgroundEffect';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Timeline from './components/Timeline';
import Research from './components/Research';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import { Menu, X, Github, BookOpen, GraduationCap, ChevronUp } from 'lucide-react';
import { PERSONAL_INFO } from './data';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigationItems = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'education', name: 'Journey' },
    { id: 'research', name: 'Research' },
    { id: 'skills', name: 'Skills' },
    { id: 'achievements', name: 'Awards' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'contact', name: 'Contact' },
  ];

  // Intersection Observer to update current active section in nav bar on scroll
  useEffect(() => {
    const observers = navigationItems.map((item) => {
      const element = document.getElementById(item.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        {
          rootMargin: '-30% 0px -45% 0px', // Trigger when section fills middle of view
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  // Monitor scroll for Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-slate-100 selection:bg-blue-500/30 selection:text-cyan-200">
        
        {/* Dynamic, responsive particle background */}
        <BackgroundEffect />

        {/* Sticky Header Nav (Apple/Linear Style) */}
        <header className="fixed top-0 left-0 right-0 z-40 border-b border-slate-900/40 bg-[#020512]/30 backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
            
            {/* Logo / Scholar Initials */}
            <div
              onClick={() => scrollToSection('hero')}
              className="flex cursor-pointer items-center gap-2 group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-violet-600 text-sm font-extrabold text-white transition-transform group-hover:scale-105">
                N
              </div>
              <span className="font-sans text-xs font-bold tracking-wider text-white uppercase group-hover:text-cyan-300 transition-colors">
                N. T. Hau
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-8 lg:flex">
              <ul className="flex items-center gap-6">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`relative font-mono text-[11px] uppercase tracking-wider transition-colors ${
                        activeSection === item.id
                          ? 'text-cyan-400 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                      {activeSection === item.id && (
                        <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-cyan-400" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Fast links on Navbar edge */}
              <div className="h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-4">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={PERSONAL_INFO.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="ResearchGate Profile"
                >
                  <BookOpen className="h-4 w-4 text-blue-400" />
                </a>
              </div>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </nav>
        </header>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 flex flex-col bg-[#020512]/95 backdrop-blur-xl lg:hidden">
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-6 text-center">
              <ul className="space-y-6">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`font-sans text-xl font-bold tracking-tight ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="h-px w-24 bg-slate-900" />
              <div className="flex items-center gap-6">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white"
                >
                  <BookOpen className="h-4 w-4 text-blue-400" />
                  <span>ResearchGate</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Major Portfolio Sections in order */}
        <main className="mx-auto max-w-7xl">
          <Hero />
          <AboutMe />
          <Timeline />
          <Research />
          <Skills />
          <Achievements />
          <Gallery />
          <Contact />
        </main>

        {/* Standard Academic Footer */}
        <footer className="border-t border-slate-900/60 bg-slate-950/20 py-12 px-6 backdrop-blur-md">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-12 text-slate-500 font-mono text-xs">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-violet-500" />
              <span>Nguyen Tan Hau © {new Date().getFullYear()} • Applied Mathematics</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-300 transition-colors"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href={PERSONAL_INFO.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-300 transition-colors"
              >
                ResearchGate
              </a>
              <span>•</span>
              <span className="text-slate-600">Built in React & Tailwind</span>
            </div>
          </div>
        </footer>

        {/* Back to Top Trigger Button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 rounded-full border border-slate-800 bg-slate-950/80 p-3 text-slate-400 hover:border-violet-500/40 hover:bg-slate-900 hover:text-white transition-all shadow-md backdrop-blur-md cursor-pointer"
            aria-label="Scroll to Top"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        )}

      </div>
    </SmoothScroll>
  );
}
