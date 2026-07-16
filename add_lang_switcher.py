with open('index.html', 'r') as f:
    content = f.read()

# We want to replace the Left Group wrapper and insert Language Switcher
target = """      <!-- Left Group: Theme Switcher & Nav -->
      <div class="hidden md:flex items-center gap-4">
        <!-- Theme Switcher -->"""

replacement = """      <!-- Left Group: Lang & Theme Switcher & Nav -->
      <div class="hidden md:flex items-center gap-4">
        <!-- Language Switcher -->
        <div class="relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]" id="lang-switcher">
          <div id="lang-indicator" class="absolute h-[32px] bg-white/10 border border-white/20 backdrop-blur-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"></div>
          
          <button id="lang-en-btn" class="relative z-10 px-3 h-8 flex items-center justify-center rounded-full text-white transition-colors duration-300 font-sans text-[11px] font-bold tracking-wider" aria-label="English">
             EN
          </button>
          <button id="lang-vi-btn" class="relative z-10 px-3 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors duration-300 font-sans text-[11px] font-bold tracking-wider" aria-label="Vietnamese">
             VI
          </button>
        </div>

        <!-- Theme Switcher -->"""

if target in content:
    content = content.replace(target, replacement)
    print("Replaced successfully")
else:
    print("Target not found")

# We also need to add <script type="module" src="i18n.js"></script> before </body>
script_tag = '<script type="module" src="i18n.js"></script>'
if script_tag not in content:
    content = content.replace('</body>', f'  {script_tag}\n</body>')

with open('index.html', 'w') as f:
    f.write(content)

