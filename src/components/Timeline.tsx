import React from 'react';
import { motion } from 'motion/react';
import Reveal from './Reveal';
import { GraduationCap, Award, FileText, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { EDUCATION_HISTORY } from '../data';

export default function Timeline() {
  return (
    <section
      id="education"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto w-full max-w-5xl space-y-16">
        
        {/* Section Header */}
        <Reveal className="space-y-3">
          <div className="font-mono text-xs tracking-widest text-violet-400 uppercase">02 / The Foundation</div>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Academic Journey
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
        </Reveal>

        {/* Timeline Structure */}
        <div className="relative mt-12 w-full">
          
          {/* Central Vertical Line (hidden on small screens, centered on large) */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-transparent md:left-1/2 md:-ml-0.5" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {EDUCATION_HISTORY.map((edu, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={edu.id}
                  className={`relative flex flex-col md:flex-row md:items-center ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  
                  {/* Glowing Timeline Marker */}
                  <div className="absolute left-4 top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-slate-950 border border-violet-500 md:left-1/2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  </div>

                  {/* Card Content Container */}
                  <div className={`pl-10 md:pl-0 w-full md:w-[45%] ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-10% 0px' }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                      className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-violet-500/20 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-violet-950/10"
                    >
                      {/* Subtle hover gradient flare inside */}
                      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-violet-500/0 via-violet-500/0 to-violet-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Card Header Info */}
                      <div className="flex flex-col gap-2 border-b border-slate-800/60 pb-4 mb-4">
                        <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-400">
                          <Calendar className="h-3 w-3" />
                          <span>{edu.period}</span>
                        </div>
                        <h3 className="font-sans text-lg font-bold text-white transition-colors group-hover:text-cyan-300 md:text-xl">
                          {edu.degree}
                        </h3>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 font-mono text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
                            <span>{edu.institution}</span>
                          </div>
                          <div className="hidden sm:inline text-slate-600">•</div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-slate-500" />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Core description (Narrative) */}
                      <p className="font-serif text-sm leading-relaxed text-slate-300 mb-4">
                        {edu.description}
                      </p>

                      {/* Educational Details & Direct Links (e.g. Thesis, Transcripts) */}
                      {edu.gpa && (
                        <div className="space-y-4 pt-2 border-t border-slate-800/40">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                            <div className="flex items-center gap-1.5 rounded-md bg-blue-500/5 border border-blue-500/10 px-2.5 py-1 text-blue-400">
                              <Award className="h-3.5 w-3.5" />
                              <span className="font-mono">GPA: <strong className="font-sans text-white">{edu.gpa}</strong></span>
                            </div>
                            
                            {edu.thesisTitle && (
                              <div className="flex items-center gap-1.5 rounded-md bg-violet-500/5 border border-violet-500/10 px-2.5 py-1 text-violet-400">
                                <FileText className="h-3.5 w-3.5" />
                                <span className="font-mono">Thesis Grade: <strong className="font-sans text-white">9.7/10</strong></span>
                              </div>
                            )}
                          </div>

                          {/* Interactive action links */}
                          <div className="flex flex-wrap gap-3 pt-1">
                            {edu.transcriptEnglishLink && (
                              <a
                                href={edu.transcriptEnglishLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
                              >
                                <span>English Transcript</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                            {edu.transcriptEnglishLink && <span className="text-slate-700 hidden sm:inline">|</span>}
                            {edu.transcriptVietnameseLink && (
                              <a
                                href={edu.transcriptVietnameseLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
                              >
                                <span>Vietnamese Transcript</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                            {edu.thesisLink && (
                              <div className="w-full pt-1">
                                <a
                                  href={edu.thesisLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-1.5 font-mono text-xs text-slate-300 hover:border-violet-500/30 hover:bg-violet-950/20 hover:text-violet-300 transition-all"
                                >
                                  <FileText className="h-3.5 w-3.5 text-violet-500" />
                                  <span>Read Bachelor's Thesis</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
