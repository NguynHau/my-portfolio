import React from 'react';
import Reveal from './Reveal';
import { Sigma, Brain, TrendingUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-5xl space-y-16">
        
        {/* Section Header */}
        <Reveal className="space-y-3">
          <div className="font-mono text-xs tracking-widest text-blue-400 uppercase">01 / The Ethos</div>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            About Me
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
        </Reveal>

        {/* Storytelling Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Main narrative block */}
          <Reveal className="space-y-6 lg:col-span-7">
            <p className="font-serif text-base leading-relaxed text-slate-300 sm:text-lg">
              To me, machine learning is not simply a suite of empirical software tools—it is an incredibly rich, evolving landscape of mathematical theory. My research passion lies at the intersection of <strong className="text-blue-400 font-sans font-medium">Applied Mathematics, Machine Learning Foundations, and Mathematical Optimization</strong>.
            </p>
            
            <p className="font-serif text-base leading-relaxed text-slate-300 sm:text-lg">
              During my Bachelor's studies, I was captivated by how mathematical abstraction can be harnessed to solve critical computational problems. This led me to develop a safe screening framework for Robust Support Vector Machines (R-SVM) under feature uncertainty for my Bachelor's thesis, proving that rigorous dual analysis can accelerate optimization training by several orders of magnitude.
            </p>

            <p className="font-serif text-base leading-relaxed text-slate-300 sm:text-lg">
              I believe that the next generation of artificial intelligence will require robust, mathematically sound frameworks. Currently, as a Master’s student in Applied Mathematics at Can Tho University, I am committed to advancing my formal understanding of variational analysis, metric regularity, and nonsmooth optimization to build theoretical guarantees for machine learning models.
            </p>

            <blockquote className="relative rounded-xl border-l-4 border-violet-500 bg-violet-950/10 p-5 backdrop-blur-md">
              <span className="absolute -top-4 -left-1 font-serif text-6xl text-violet-500/10 select-none">“</span>
              <p className="font-serif italic text-sm text-slate-400 leading-relaxed">
                "Mathematics is the language in which God has written the universe. In optimization, we do not merely seek any answer—we seek the most perfect, efficient balance possible under physical constraint."
              </p>
            </blockquote>
          </Reveal>

          {/* Research Pillars Cards (Bento-like column on the right) */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal delay={0.1}>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Core Research Pillars
              </h3>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  icon: Sigma,
                  title: 'Optimization Theory',
                  color: 'text-blue-400',
                  bg: 'bg-blue-500/5',
                  border: 'border-blue-500/10',
                  desc: 'Proving safe screening rules, duality gaps, and developing efficient algorithms for robust model training.',
                },
                {
                  icon: Brain,
                  title: 'Machine Learning Foundations',
                  color: 'text-violet-400',
                  bg: 'bg-violet-500/5',
                  border: 'border-violet-500/10',
                  desc: 'Analyzing the mathematical limits, convergence rates, and geometric behavior of high-dimensional learning systems.',
                },
                {
                  icon: TrendingUp,
                  title: 'Variational & Data Analysis',
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-500/5',
                  border: 'border-cyan-500/10',
                  desc: 'Studying set-valued mappings, metric regularity, coderivatives, and applying statistical forecasting to real-world problems.',
                },
              ].map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Reveal key={index} delay={0.15 + index * 0.1}>
                    <div className={`group flex gap-4 rounded-xl border ${pillar.border} ${pillar.bg} p-5 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-slate-900/40 hover:-translate-y-1`}>
                      <div className={`rounded-lg bg-slate-950 p-2.5 h-fit ${pillar.color} border border-slate-800 group-hover:border-slate-700`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans text-sm font-bold text-white transition-colors group-hover:text-cyan-300">
                          {pillar.title}
                        </h4>
                        <p className="font-serif text-xs leading-relaxed text-slate-400">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
