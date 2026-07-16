with open('index.html', 'r') as f:
    content = f.read()

# Replace the flex groups
target = """    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
      
      <!-- Left Group: Lang & Theme Switcher & Nav -->
      <div class="hidden md:flex items-center gap-4">
        <!-- Language Switcher -->"""

replacement = """    <div class="max-w-[1400px] w-full mx-auto px-6 flex items-center justify-between relative">
      
      <!-- Left Group: Lang & Theme Switcher -->
      <div class="hidden xl:flex items-center gap-4 z-10 w-[30%]">
        <!-- Language Switcher -->"""

content = content.replace(target, replacement)

# Now we need to split the Nav out
target2 = """        <!-- Theme Switcher -->
        <div class="relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]" id="theme-switcher">
          <div id="theme-indicator" class="absolute h-[32px] w-[32px] bg-white/10 border border-white/20 backdrop-blur-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"></div>
          
          <button id="theme-light-btn" class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors duration-300" aria-label="Light theme">
             <i data-lucide="sun" class="h-4 w-4"></i>
          </button>
          <button id="theme-dark-btn" class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors duration-300" aria-label="Dark theme">
             <i data-lucide="moon" class="h-4 w-4"></i>
          </button>
        </div>

        <!-- Desktop Navigation Menu -->"""

replacement2 = """        <!-- Theme Switcher -->
        <div class="relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]" id="theme-switcher">
          <div id="theme-indicator" class="absolute h-[32px] w-[32px] bg-white/10 border border-white/20 backdrop-blur-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"></div>
          
          <button id="theme-light-btn" class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors duration-300" aria-label="Light theme">
             <i data-lucide="sun" class="h-4 w-4"></i>
          </button>
          <button id="theme-dark-btn" class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors duration-300" aria-label="Dark theme">
             <i data-lucide="moon" class="h-4 w-4"></i>
          </button>
        </div>
      </div>

      <!-- Center Group: Desktop Navigation Menu -->
      <div class="hidden xl:flex justify-center z-10 w-[40%]">
        <!-- Desktop Navigation Menu -->"""

content = content.replace(target2, replacement2)

target3 = """      <!-- Right Group: ORCID Island -->
      <div class="hidden md:flex relative items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]">"""

replacement3 = """      <!-- Right Group: ORCID Island -->
      <div class="hidden xl:flex relative justify-end z-10 w-[30%]">
        <div class="flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]">"""

content = content.replace(target3, replacement3)

# Fix missing closing div for right group
target4 = """        </a>
      </div>

      <!-- Mobile Nav Trigger -->"""

replacement4 = """        </a>
        </div>
      </div>

      <!-- Mobile Nav Trigger -->"""

content = content.replace(target4, replacement4)

# Fix Nav items padding to h-8
content = content.replace('class="relative z-10 px-4 py-2 rounded-full text-slate-400 hover:text-white transition-colors duration-300"', 'class="relative z-10 px-4 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors duration-300"')

with open('index.html', 'w') as f:
    f.write(content)
