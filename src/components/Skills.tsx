import React from 'react';
import { motion } from 'motion/react';
import Reveal from './Reveal';
import { Terminal, Cpu, Database, Edit, Globe, ExternalLink } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';

// Helper to assign icons to categories
const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'skills-lang':
      return Terminal;
    case 'skills-ds':
      return Cpu;
    case 'skills-tools':
      return Database;
    case 'skills-writing':
      return Edit;
    case 'skills-human-lang':
      return Globe;
    default:
      return Terminal;
  }
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto w-full max-w-5xl space-y-16">
        
        {/* Section Header */}
        <Reveal className="space-y-3">
          <div className="font-mono text-xs tracking-widest text-blue-400 uppercase">04 / The Toolset</div>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Technical & Scientific Skills
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
        </Reveal>

        {/* Categories Grid (Bento Style) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((cat, catIdx) => {
            const Icon = getCategoryIcon(cat.id);
            const isFullWidthOnLarge = cat.id === 'skills-ds'; // Make the heavy math/data science category stand out if we want

            return (
              <Reveal
                key={cat.id}
                delay={catIdx * 0.1}
                className={`${
                  isFullWidthOnLarge ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div className="group h-full rounded-2xl border border-slate-800 bg-slate-900/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/20">
                  
                  {/* Category Header */}
                  <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4 mb-4">
                    <div className="rounded-lg bg-slate-950 border border-slate-800 p-2 text-cyan-400 transition-colors group-hover:border-slate-700 group-hover:bg-slate-900">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-sans text-sm font-bold text-white tracking-wide transition-colors group-hover:text-cyan-300">
                      {cat.name}
                    </h3>
                  </div>

                  {/* Chips Container */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, skillIdx) => {
                      const isEnglishB2 = skill.includes('English (B2 CEFR');
                      
                      if (isEnglishB2) {
                        return (
                          <motion.a
                            key={skillIdx}
                            href="https://credentials.britishcouncil.org/c399fc67-bbce-45f3-a42a-8ac40b25ca13?key=c77986e6be1a050a5b83137a9815a697c769a48cc664e8f5c5dfca35f55993e1#acc.KN7QShCF"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3, scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 font-mono text-xs text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10 transition-colors cursor-pointer"
                          >
                            <span>{skill}</span>
                            <ExternalLink className="h-3 w-3" />
                          </motion.a>
                        );
                      }

                      // Check if it's a primary skill to give it a slightly highlighted style
                      const isHighlight = 
                        skill === 'Python' || 
                        skill === 'Machine Learning' || 
                        skill === 'Mathematical Optimization' ||
                        skill === 'LaTeX' ||
                        skill === 'Typst';

                      return (
                        <motion.span
                          key={skillIdx}
                          whileHover={{ y: -3, scale: 1.03 }}
                          className={`inline-flex items-center rounded-lg px-3 py-1.5 font-mono text-xs transition-colors border select-none ${
                            isHighlight
                              ? 'border-violet-500/20 bg-violet-500/5 text-violet-300 hover:border-violet-400 hover:bg-violet-500/10'
                              : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          {skill}
                        </motion.span>
                      );
                    })}
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
