import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from './Reveal';
import { Mail, Github, BookOpen, Send, CheckCircle2, Download, Phone, MapPin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission since this is serverless / GitHub Pages compatible
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', affiliation: '', message: '' });
      
      // Auto dismiss success toast after 5s
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto w-full max-w-5xl space-y-16">
        
        {/* Section Header */}
        <Reveal className="space-y-3">
          <div className="font-mono text-xs tracking-widest text-violet-400 uppercase">07 / The Connection</div>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Let's Collaborate
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Personal info & Academic channels */}
          <div className="space-y-8 lg:col-span-5">
            <Reveal className="space-y-4">
              <h3 className="font-sans text-xl font-bold text-white">
                Contact Information
              </h3>
              <p className="font-serif text-sm leading-relaxed text-slate-400">
                I am always open to discussing new research collaborations, optimization methodology improvements, data analysis positions, or graduate research opportunities.
              </p>
            </Reveal>

            {/* Quick Contact Widgets */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: 'Email Address',
                  value: PERSONAL_INFO.email,
                  href: `mailto:${PERSONAL_INFO.email}`,
                  color: 'text-blue-400',
                  bg: 'bg-blue-500/5',
                },
                {
                  icon: Phone,
                  label: 'Phone Contact',
                  value: PERSONAL_INFO.phone,
                  href: `tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`,
                  color: 'text-violet-400',
                  bg: 'bg-violet-500/5',
                },
                {
                  icon: MapPin,
                  label: 'Academic Base',
                  value: PERSONAL_INFO.location,
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-500/5',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={idx} delay={0.05 * idx}>
                    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/10 p-4 backdrop-blur-md">
                      <div className={`rounded-lg p-2.5 ${item.bg} ${item.color} border border-slate-800`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          {item.label}
                        </span>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="block font-mono text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="block font-mono text-xs text-slate-300">
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* CV Download & Social Links Row */}
            <div className="space-y-4 pt-4 border-t border-slate-900">
              <Reveal>
                <div className="flex flex-wrap gap-3">
                  {/* GitHub Profile */}
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-white hover:bg-slate-900/60 transition-all duration-300"
                  >
                    <Github className="h-4.5 w-4.5" />
                  </a>

                  {/* ResearchGate Profile */}
                  <a
                    href={PERSONAL_INFO.researchGate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-2 font-sans text-xs text-slate-400 hover:border-slate-700 hover:text-white hover:bg-slate-900/60 transition-all duration-300"
                  >
                    <BookOpen className="h-4 w-4 text-blue-400" />
                    <span className="font-mono">ResearchGate</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </div>
              </Reveal>

              {/* Direct CV Download Action */}
              <Reveal delay={0.1}>
                <a
                  href="CV.pdf"
                  download="Nguyen_Tan_Hau_CV.pdf"
                  className="group inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 font-sans text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-500 hover:to-violet-500 hover:shadow-blue-500/15 hover:scale-[1.01]"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Academic CV (CV.pdf)</span>
                </a>
                <p className="mt-2 font-serif text-[10px] text-slate-500 italic max-w-sm">
                  Note: Place your CV file as "CV.pdf" in the repository root folder to activate immediate download for visitors.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Serverless Contact Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/10 p-6 backdrop-blur-xl md:p-8">
                
                <h3 className="font-sans text-lg font-bold text-white mb-6">
                  Send Academic Inquiry
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="font-sans text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-2.5 font-sans text-sm text-white placeholder-slate-600 focus:border-cyan-500/50 focus:bg-slate-950 focus:outline-none transition-colors"
                        placeholder="Dr. Marie Curie"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-sans text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-2.5 font-sans text-sm text-white placeholder-slate-600 focus:border-cyan-500/50 focus:bg-slate-950 focus:outline-none transition-colors"
                        placeholder="marie@research.org"
                      />
                    </div>
                  </div>

                  {/* Affiliation */}
                  <div className="space-y-1.5">
                    <label htmlFor="affiliation" className="font-sans text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Academic Affiliation / Institution
                    </label>
                    <input
                      type="text"
                      id="affiliation"
                      value={formData.affiliation}
                      onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-2.5 font-sans text-sm text-white placeholder-slate-600 focus:border-cyan-500/50 focus:bg-slate-950 focus:outline-none transition-colors"
                      placeholder="e.g. Stanford University, MIT, etc."
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="font-sans text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Inquiry / Research Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-2.5 font-sans text-sm text-white placeholder-slate-600 focus:border-cyan-500/50 focus:bg-slate-950 focus:outline-none transition-colors resize-none"
                      placeholder="Describe your collaborative opportunity or inquiry..."
                    />
                  </div>

                  {/* Submission Indicator Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 border border-slate-800 py-3 font-mono text-xs font-semibold tracking-wider text-slate-300 hover:border-cyan-500/40 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="h-4 w-4 animate-spin rounded-full border border-slate-400 border-t-transparent" />
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>SUBMIT COLLABORATION PROPOSAL</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Success simulated prompt toast */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-slate-950/95 p-6 text-center backdrop-blur-md"
                    >
                      <CheckCircle2 className="h-12 w-12 text-emerald-400 animate-bounce" />
                      <h4 className="mt-4 font-sans text-lg font-bold text-white">Proposal Transmitted</h4>
                      <p className="mt-2 max-w-sm font-serif text-sm leading-relaxed text-slate-400">
                        Thank you! Your academic message has been simulated successfully. Since this is a static portfolio compatible with GitHub Pages, your message was processed securely locally. I look forward to connecting with you!
                      </p>
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="mt-6 rounded-md border border-slate-800 bg-slate-900 px-4 py-1.5 font-mono text-[10px] text-slate-400 hover:text-white"
                      >
                        CLOSE
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
