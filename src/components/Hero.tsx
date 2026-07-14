import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, BookOpen, ArrowDown, MapPin, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Hero() {
  const [imageSrc, setImageSrc] = useState('anh2.jpg');
  const [imageError, setImageError] = useState(false);

  // Attempt fallbacks if the primary file name isn't found
  useEffect(() => {
    if (imageError) {
      // Try alternative common names if the original has encoding issues
      const fallbacks = ['anh2.jpg', 'Anh2.jpg', 'ảnh thẻ 2.jpg', 'anh_the_2.jpg'];
      const currentIdx = fallbacks.indexOf(imageSrc);
      if (currentIdx !== -1 && currentIdx < fallbacks.length - 1) {
        setImageSrc(fallbacks[currentIdx + 1]);
        setImageError(false);
      }
    }
  }, [imageError, imageSrc]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between px-6 pt-24 pb-12 md:px-12 lg:px-24"
    >
      <div className="my-auto grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        
        {/* Left Side: Dynamic typography and academic title */}
        <div className="space-y-6 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/5 px-4 py-1.5 font-mono text-xs tracking-wider text-cyan-400 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            CAN THO UNIVERSITY • APPLIED MATHEMATICS
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">{PERSONAL_INFO.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-lg font-medium text-slate-300 md:text-xl lg:text-2xl"
            >
              {PERSONAL_INFO.title}
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-xl font-serif text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {PERSONAL_INFO.objective}
          </motion.p>

          {/* Core Research Interests */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {['Applied Mathematics', 'Machine Learning', 'Mathematical Optimization', 'Data Analysis', 'Variational Analysis'].map((interest, i) => (
              <span
                key={i}
                className="rounded-md border border-slate-800 bg-slate-900/40 px-3 py-1 font-mono text-xs text-slate-300 backdrop-blur-md transition-colors duration-300 hover:border-blue-500/30 hover:bg-slate-900/60"
              >
                {interest}
              </span>
            ))}
          </motion.div>

          {/* Dynamic Interactive Call to Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection('research')}
              className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-500 hover:to-violet-500 hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-95"
            >
              <span>Explore Research</span>
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-6 py-3 font-sans text-sm font-semibold text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 hover:text-white"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* High contrast quick contact widgets */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-slate-900 font-mono text-xs text-slate-500"
          >
            <div className="flex items-center gap-2 hover:text-slate-300 transition-colors">
              <MapPin className="h-3.5 w-3.5 text-blue-500" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-300 transition-colors">
              <Phone className="h-3.5 w-3.5 text-violet-500" />
              <span>{PERSONAL_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-300 transition-colors">
              <Mail className="h-3.5 w-3.5 text-cyan-500" />
              <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Portrait Image inside a premium Glassmorphic shadow box */}
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group relative h-[340px] w-[280px] sm:h-[400px] sm:w-[320px] md:h-[420px] md:w-[340px]"
          >
            {/* Pulsating backdrop glow */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-600/20 via-violet-600/10 to-cyan-400/20 opacity-50 blur-2xl transition-all duration-700 group-hover:opacity-70 group-hover:blur-3xl" />

            {/* Glowing borders */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:bg-slate-950/50" />

            <div className="absolute inset-3 overflow-hidden rounded-xl">
              {!imageError ? (
                <img
                  src={imageSrc}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                />
              ) : (
                /* Premium mathematical SVG animation when photo is missing */
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/50 p-6 text-center select-none">
                  <svg className="h-28 w-28 text-blue-500 animate-spin" style={{ animationDuration: '40s' }} viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" strokeDasharray="2,2" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
                    <polygon points="50,15 80,65 20,65" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
                    <circle cx="50" cy="15" r="4" fill="#60a5fa" />
                    <circle cx="80" cy="65" r="4" fill="#c084fc" />
                    <circle cx="20" cy="65" r="4" fill="#38bdf8" />
                  </svg>
                  <p className="mt-6 font-sans text-xs font-semibold tracking-wider text-slate-400">MATH MODEL ACTIVE</p>
                  <p className="mt-2 font-serif text-[11px] leading-relaxed text-slate-500 px-4">
                    "Mathematics reveals its secrets only to those who approach it with pure love, for its beauty."
                  </p>
                </div>
              )}

              {/* Glass sweep overlay on hover */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 group-hover:animate-shimmer" />
            </div>

            {/* Micro details: Small mono badge on the photo frame */}
            <div className="absolute -bottom-3 -right-3 rounded-md bg-slate-900/90 border border-slate-800 px-3 py-1 font-mono text-[10px] text-cyan-400 shadow-md">
              θ* = arg min L(θ)
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Explore indicator at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={() => scrollToSection('about')}
        className="mx-auto flex cursor-pointer flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 hover:text-blue-400 transition-colors"
      >
        <span>Explore Portfolio</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
