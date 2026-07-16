with open('index.html', 'r') as f:
    content = f.read()

# 1. Theme Switcher and Nav
target_header = """      <div class="hidden md:flex items-center gap-4">
        <!-- Theme Switcher -->
        <div class="relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]" id="theme-switcher">
          <div id="theme-indicator" class="absolute h-[32px] w-[32px] bg-white/10 border border-white/20 backdrop-blur-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"></div>
          
          <button id="theme-light-btn" class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors duration-300" aria-label="Light theme">
             <i data-lucide="sun" class="h-4 w-4"></i>
          </button>
          <button id="theme-dark-btn" class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors duration-300" aria-label="Dark theme">
             <i data-lucide="moon" class="h-4 w-4"></i>
          </button>
        </div>

        <!-- Desktop Navigation Menu -->
        <nav class="relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 text-xs font-sans font-medium tracking-wide pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <!-- Liquid Glass Active Indicator -->
        <div id="nav-indicator" class="absolute h-[32px] bg-white/10 border border-white/20 backdrop-blur-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"></div>

        
        <a href="#about" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">About</a>
        <a href="#journey" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">Journey</a>
        <a href="#research" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">Research</a>
        <a href="#skills" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">Skills</a>
        <a href="#achievements" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">Achievements</a>
        <a href="#contact" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">Contact</a>
      </nav>
      </div>"""

replacement_header = """      <!-- Theme Switcher -->
      <div class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]" id="theme-switcher">
        <div id="theme-indicator" class="absolute h-[32px] w-[32px] bg-white/10 border border-white/20 backdrop-blur-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"></div>
        
        <button id="theme-light-btn" class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors duration-300" aria-label="Light theme">
           <i data-lucide="sun" class="h-4 w-4"></i>
        </button>
        <button id="theme-dark-btn" class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors duration-300" aria-label="Dark theme">
           <i data-lucide="moon" class="h-4 w-4"></i>
        </button>
      </div>

      <!-- Desktop Navigation Menu -->
      <nav class="hidden md:flex relative items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 text-xs font-sans font-medium tracking-wide pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <!-- Liquid Glass Active Indicator -->
        <div id="nav-indicator" class="absolute h-[32px] bg-white/10 border border-white/20 backdrop-blur-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"></div>

        
        <a href="#about" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">About</a>
        <a href="#journey" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">Journey</a>
        <a href="#research" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">Research</a>
        <a href="#skills" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">Skills</a>
        <a href="#achievements" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">Achievements</a>
        <a href="#contact" class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300">Contact</a>
      </nav>"""

if target_header in content:
    content = content.replace(target_header, replacement_header)
    print("Replaced Header section")
else:
    print("Could not find Header section block")

# 2. Remove floating ORCID
target_floating_orcid = """      <!-- Action Button (ORCID) -->
      <div class="hidden md:flex items-center gap-4 pointer-events-auto absolute right-6 top-1/2 -translate-y-1/2">
        <!-- ORCID Badge -->
        <a href="https://orcid.org/0009-0006-1357-8882" target="_blank" class="font-sans text-xs font-medium text-slate-400 hover:text-green-400 flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-2xl backdrop-saturate-150 hover:bg-white/10 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <svg class="h-3.5 w-3.5 text-green-500 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.37 18.064H5.322V5.936H7.37v12.128zm-1.023-13.43a1.22 1.22 0 0 1-1.218-1.219c0-.671.548-1.218 1.218-1.218.671 0 1.219.547 1.219 1.218a1.22 1.22 0 0 1-1.219 1.219zm11.59 13.43h-2.181l-.16-1.517c-.896 1.121-2.228 1.688-3.992 1.688-2.616 0-4.634-1.89-4.634-4.814 0-3.003 2.124-4.851 4.754-4.851 1.716 0 2.94.575 3.821 1.642V5.936h2.046v12.128zm-5.351-1.854c1.552 0 2.821-.992 2.821-2.923 0-1.785-1.127-2.91-2.821-2.91-1.553 0-2.814 1.125-2.814 2.91 0 1.931 1.261 2.923 2.814 2.923z"/>
          </svg>
          ORCID 0009-0006-1357-8882
        </a>
      </div>"""

if target_floating_orcid in content:
    content = content.replace(target_floating_orcid, "")
    print("Removed floating ORCID")
else:
    print("Could not find floating ORCID block")

# 3. Replace Academic Portfolio badge with ORCID badge
target_portfolio = """        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-sans font-semibold tracking-wider text-blue-400 uppercase mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          Academic Portfolio
        </span>"""

replacement_portfolio = """        <a href="https://orcid.org/0009-0006-1357-8882" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-sans font-medium tracking-wider text-slate-300 hover:text-green-400 mb-6 group cursor-pointer pointer-events-auto">
          <svg class="h-3.5 w-3.5 text-green-500 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.37 18.064H5.322V5.936H7.37v12.128zm-1.023-13.43a1.22 1.22 0 0 1-1.218-1.219c0-.671.548-1.218 1.218-1.218.671 0 1.219.547 1.219 1.218a1.22 1.22 0 0 1-1.219 1.219zm11.59 13.43h-2.181l-.16-1.517c-.896 1.121-2.228 1.688-3.992 1.688-2.616 0-4.634-1.89-4.634-4.814 0-3.003 2.124-4.851 4.754-4.851 1.716 0 2.94.575 3.821 1.642V5.936h2.046v12.128zm-5.351-1.854c1.552 0 2.821-.992 2.821-2.923 0-1.785-1.127-2.91-2.821-2.91-1.553 0-2.814 1.125-2.814 2.91 0 1.931 1.261 2.923 2.814 2.923z"/>
          </svg>
          ORCID
        </a>"""

if target_portfolio in content:
    content = content.replace(target_portfolio, replacement_portfolio)
    print("Replaced Academic Portfolio with ORCID")
else:
    print("Could not find Academic Portfolio block")

with open('index.html', 'w') as f:
    f.write(content)

