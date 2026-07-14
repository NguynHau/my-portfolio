import React from 'react';
import Reveal from './Reveal';
import { Award, ShieldAlert, Calendar, CheckCircle2, BookmarkCheck, ExternalLink } from 'lucide-react';
import { ACHIEVEMENTS, CERTIFICATES } from '../data';

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto w-full max-w-5xl space-y-16">
        
        {/* Section Header */}
        <Reveal className="space-y-3">
          <div className="font-mono text-xs tracking-widest text-violet-400 uppercase">05 / The Milestones</div>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Achievements & Scholarships
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
        </Reveal>

        {/* Dual Column Layout: Scholarships on Left, Certificates on Right */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Scholarships & Grants (Elegant Glass Cards) */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <Award className="h-4 w-4 text-violet-400" />
                Grants & Scholarships
              </h3>
            </Reveal>

            <div className="space-y-4">
              {ACHIEVEMENTS.map((ach, idx) => (
                <Reveal key={ach.id} delay={0.1 + idx * 0.1}>
                  <div className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/20 hover:bg-white/[0.04]">
                    {/* Glowing highlight in corner of glass card */}
                    <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/5 border border-cyan-500/10 px-2.5 py-0.5 rounded-full">
                          {ach.period}
                        </span>
                      </div>
                      <h4 className="font-sans text-base font-bold text-white transition-colors group-hover:text-cyan-300">
                        {ach.title}
                      </h4>
                      <p className="font-mono text-xs text-slate-500">
                        {ach.issuer}
                      </p>
                      {ach.description && (
                        <p className="font-serif text-xs leading-relaxed text-slate-400 border-t border-slate-800/40 pt-2">
                          {ach.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Certificates (Checklist widgets) */}
          <div className="space-y-6 lg:col-span-7">
            <Reveal>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <BookmarkCheck className="h-4 w-4 text-blue-400" />
                Certificates & Academic Honors
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CERTIFICATES.map((cert, idx) => (
                <Reveal key={cert.id} delay={0.1 + idx * 0.08}>
                  {cert.link ? (
                    /* Clickable certificate card */
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between h-full rounded-xl border border-slate-800 bg-slate-950/20 p-4.5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20 hover:bg-slate-900/40 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
                            {cert.date}
                          </span>
                          <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <h4 className="font-sans text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {cert.title}
                        </h4>
                      </div>
                      <p className="font-serif text-[11px] text-slate-500 mt-2 border-t border-slate-800/40 pt-1.5 leading-normal">
                        {cert.issuer}
                      </p>
                    </a>
                  ) : (
                    /* Non-clickable standard card */
                    <div className="group flex flex-col justify-between h-full rounded-xl border border-slate-800/60 bg-slate-950/10 p-4.5 backdrop-blur-md transition-all duration-300 hover:border-slate-800 hover:bg-slate-900/20">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-500/70 group-hover:text-blue-400 transition-colors" />
                          <span className="font-mono text-[9px] text-slate-500">
                            {cert.date}
                          </span>
                        </div>
                        <h4 className="font-sans text-xs font-bold text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                          {cert.title}
                        </h4>
                      </div>
                      <p className="font-serif text-[11px] text-slate-500 mt-2 border-t border-slate-800/40 pt-1.5 leading-normal">
                        {cert.issuer}
                      </p>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
