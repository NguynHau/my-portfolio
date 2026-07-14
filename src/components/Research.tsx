import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import Reveal from './Reveal';
import { FileText, ArrowUpRight, CheckCircle2, RefreshCw, Layers, Award } from 'lucide-react';
import { RESEARCH_PROJECTS } from '../data';
import { ResearchProject } from '../types';

interface CardProps {
  project: ResearchProject;
  index: number;
  key?: React.Key;
}

function ResearchCard({ project, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt calculation based on mouse coordinates relative to card bounds
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to percentage for radial spotlight glow
    const pctX = (mouseX / width) * 100;
    const pctY = (mouseY / height) * 100;
    setGlowX(pctX);
    setGlowY(pctY);

    // Calculate rotation (-8deg to 8deg)
    const degX = ((mouseY / height) - 0.5) * -10;
    const degY = ((mouseX / width) - 0.5) * 10;
    setRotateX(degX);
    setRotateY(degY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const isFirstAuthor = project.authors.includes('First Author');

  return (
    <Reveal delay={index * 0.1}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/10 p-6 backdrop-blur-md transition-all duration-500 ease-out hover:border-slate-700/60 hover:bg-slate-900/20"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glowing spotlight effect matching mouse coordinates */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: isHovered
              ? `radial-gradient(400px circle at ${glowX}% ${glowY}%, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)`
              : 'none',
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Content of Card */}
        <div className="flex flex-col h-full justify-between gap-6" style={{ transform: 'translateZ(20px)' }}>
          <div className="space-y-4">
            
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  {project.year}
                </span>
                <span className="text-slate-700">•</span>
                <span className="font-mono text-[10px] text-cyan-400">
                  {project.period || 'Continuous'}
                </span>
              </div>

              {/* Publication Status Tag */}
              <div
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold border ${
                  project.status === 'Accepted'
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400'
                    : 'border-amber-500/20 bg-amber-500/5 text-amber-400'
                }`}
              >
                {project.status === 'Accepted' ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: '4s' }} />
                )}
                <span>{project.status}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-sans text-lg font-bold text-white transition-colors hover:text-cyan-300 md:text-xl">
              {project.title}
            </h3>

            {/* Author details with highlight */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-500">Authors:</span>
              <span className={isFirstAuthor ? 'text-blue-300 font-semibold' : 'text-slate-300'}>
                {project.authors}
              </span>
              {isFirstAuthor && (
                <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-blue-400 uppercase tracking-wider">
                  Lead
                </span>
              )}
            </div>

            {/* Project description (Serif format) */}
            <p className="font-serif text-sm leading-relaxed text-slate-400">
              {project.description}
            </p>

            {/* Contributions Details Grid */}
            <div className="space-y-2 pt-2">
              <span className="flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-slate-300">
                <Layers className="h-3.5 w-3.5 text-blue-500" />
                Key Contributions
              </span>
              <ul className="grid grid-cols-1 gap-2 pl-4 sm:grid-cols-2">
                {project.contributions.map((con, index) => (
                  <li
                    key={index}
                    className="font-serif list-disc text-xs text-slate-400 leading-normal"
                  >
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer action and Keywords */}
          <div className="flex flex-col gap-4 border-t border-slate-800/60 pt-4 md:flex-row md:items-center md:justify-between">
            {/* Keywords */}
            <div className="flex flex-wrap gap-1.5">
              {project.keywords.slice(0, 3).map((kw, i) => (
                <span
                  key={i}
                  className="rounded bg-slate-950 px-2 py-0.5 font-mono text-[10px] text-slate-500 border border-slate-800/40"
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Link trigger to Drive */}
            <a
              href={project.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 border border-slate-800 px-4 py-2 font-mono text-xs text-slate-300 hover:border-blue-500/30 hover:bg-slate-900 hover:text-blue-300 transition-all"
            >
              <FileText className="h-3.5 w-3.5 text-blue-500 transition-transform group-hover/btn:scale-110" />
              <span>Read Full Manuscript</span>
              <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>

        </div>
      </div>
    </Reveal>
  );
}

export default function Research() {
  return (
    <section
      id="research"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto w-full max-w-5xl space-y-16">
        
        {/* Section Header */}
        <Reveal className="space-y-3">
          <div className="font-mono text-xs tracking-widest text-cyan-400 uppercase">03 / The Output</div>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Research & Publications
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
        </Reveal>

        {/* List of Research projects */}
        <div className="grid grid-cols-1 gap-8">
          {RESEARCH_PROJECTS.map((proj, idx) => (
            <ResearchCard key={proj.id} project={proj} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
