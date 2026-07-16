import re

with open('index.html', 'r') as f:
    content = f.read()

# Remove absolute positioning from theme-switcher
# Before: ... absolute left-6 top-1/2 -translate-y-1/2" id="theme-switcher">
# After: ... " id="theme-switcher">

content = content.replace(
    'shadow-[0_8px_32px_rgba(0,0,0,0.3)] absolute left-6 top-1/2 -translate-y-1/2" id="theme-switcher">',
    'shadow-[0_8px_32px_rgba(0,0,0,0.3)]" id="theme-switcher">'
)

# Also need to remove 'hidden md:flex' from theme-switcher and nav, because they will be wrapped in a container that handles it?
# Or just leave them as is, but if we put them in a flex container, it might be better to manage hiding on the wrapper.
# Let's wrap both of them in `<div class="hidden md:flex items-center gap-4">`
# and remove `hidden md:flex` from the inner elements.

content = content.replace(
    '<div class="hidden md:flex relative items-center bg-white/5 border border-white/10',
    '<div class="relative flex items-center bg-white/5 border border-white/10'
)

content = content.replace(
    '<nav class="hidden md:flex relative items-center bg-white/5 border border-white/10',
    '<nav class="relative flex items-center bg-white/5 border border-white/10'
)

# Now find the wrapper placement
theme_switcher_start = '<!-- Theme Switcher -->'
theme_switcher_regex = r'(<!-- Theme Switcher -->\s*<div class="relative flex items-center.*?</div>)'
# Actually, let's just insert the wrapper before Theme Switcher and close it after Nav

# Let's find exactly the block to replace
target_block = """      <!-- Theme Switcher -->
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
      <nav class="relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 text-xs font-sans font-medium tracking-wide pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]">"""

replacement = """      <div class="hidden md:flex items-center gap-4">
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
        <nav class="relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 text-xs font-sans font-medium tracking-wide pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]">"""

if target_block in content:
    content = content.replace(target_block, replacement)
    
    # Now we need to close the wrapper div after </nav>
    nav_end = "</nav>"
    nav_end_idx = content.find(nav_end, content.find(replacement))
    if nav_end_idx != -1:
        content = content[:nav_end_idx + len(nav_end)] + "\n      </div>" + content[nav_end_idx + len(nav_end):]
    
    with open('index.html', 'w') as f:
        f.write(content)
    print("Success")
else:
    print("Target block not found")

