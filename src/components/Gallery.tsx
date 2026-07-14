import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Reveal from './Reveal';
import { Image, MapPin, ZoomIn, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: string;
  src: string;
  fallbackUnsplash: string;
  isPersonalSelfie?: boolean;
}

export default function Gallery() {
  const [selfieSrc, setSelfieSrc] = useState('anh2.jpg');
  const [selfieError, setSelfieError] = useState(false);

  useEffect(() => {
    if (selfieError) {
      const fallbacks = ['anh2.jpg', 'Anh2.jpg', 'ảnh thẻ 2.jpg', 'anh_the_2.jpg'];
      const currentIdx = fallbacks.indexOf(selfieSrc);
      if (currentIdx !== -1 && currentIdx < fallbacks.length - 1) {
        setSelfieSrc(fallbacks[currentIdx + 1]);
        setSelfieError(false);
      }
    }
  }, [selfieError, selfieSrc]);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gallery-1',
      title: 'Nguyen Tan Hau (Personal Portrait)',
      location: 'Can Tho University, Vietnam',
      category: 'Lead Researcher',
      src: selfieSrc,
      fallbackUnsplash: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      isPersonalSelfie: true,
    },
    {
      id: 'gallery-2',
      title: 'Universiti Brunei Darussalam Exchange',
      location: 'Darussalam, Brunei',
      category: 'International Exchange Program',
      src: 'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80&w=800', // Beautiful natural tropical landscape/campus vibe
      fallbackUnsplash: 'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'gallery-3',
      title: 'Applied Math & Scientific Computing Lab',
      location: 'College of Natural Sciences, CTU',
      category: 'Mathematical Research Base',
      src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800', // Modern physics/math algorithm visualization background
      fallbackUnsplash: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <section
      id="gallery"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto w-full max-w-5xl space-y-16">
        
        {/* Section Header */}
        <Reveal className="space-y-3">
          <div className="font-mono text-xs tracking-widest text-blue-400 uppercase">06 / The Perspective</div>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Personal Gallery
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
        </Reveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, idx) => {
            const displaySrc = item.isPersonalSelfie && selfieError ? item.fallbackUnsplash : item.src;
            
            return (
              <Reveal key={item.id} delay={0.1 + idx * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 p-3 backdrop-blur-xl transition-all duration-500 hover:border-slate-700 hover:shadow-xl hover:shadow-blue-950/10 hover:-translate-y-1">
                  
                  {/* Photo container with gentle zoom effect */}
                  <div className="relative h-[280px] w-full overflow-hidden rounded-xl bg-slate-900">
                    {item.isPersonalSelfie && selfieError ? (
                      /* Fallback for selfie with extremely beautiful vector pattern if image is missing */
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 p-6 text-center select-none">
                        <svg className="h-14 w-14 text-violet-500 opacity-60 animate-pulse" viewBox="0 0 100 100">
                          <polygon points="50,15 80,65 20,65" stroke="currentColor" strokeWidth="1" fill="none" />
                          <circle cx="50" cy="15" r="3" fill="currentColor" />
                          <circle cx="80" cy="65" r="3" fill="currentColor" />
                          <circle cx="20" cy="65" r="3" fill="currentColor" />
                        </svg>
                        <h4 className="mt-4 font-sans text-xs font-bold text-slate-300">Nguyen Tan Hau</h4>
                        <p className="mt-1.5 font-mono text-[9px] text-slate-500">Selfie Placeholder (anh2.jpg)</p>
                        <p className="mt-4 font-serif text-[10px] text-slate-400 max-w-[200px] leading-relaxed">
                          Place "anh2.jpg" in the public directory to load your photo automatically.
                        </p>
                      </div>
                    ) : (
                      <img
                        src={displaySrc}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        onError={() => {
                          if (item.isPersonalSelfie) {
                            setSelfieError(true);
                          }
                        }}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Gradient shading overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Interactive Zoom Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="rounded-full bg-slate-900/80 border border-slate-700/60 p-3 text-cyan-400 shadow-md">
                        <Eye className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Card Description Caption inside glass base */}
                  <div className="mt-4 px-2 pb-2 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[9px] text-violet-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-sans text-sm font-bold text-white transition-colors group-hover:text-cyan-300">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                      <MapPin className="h-3 w-3 text-slate-600" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
