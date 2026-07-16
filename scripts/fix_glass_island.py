with open('index.html', 'r') as f:
    content = f.read()

# Add glass-island class to the elements
targets = [
    'id="lang-switcher"',
    'id="theme-switcher"',
    'nav class="relative flex items-center bg-white/5',
    '<div class="flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]">',
    'id="mobile-menu-btn"'
]

for t in targets:
    if t == 'id="lang-switcher"':
        content = content.replace('id="lang-switcher"', 'id="lang-switcher" class="glass-island relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]"')
        # remove the old class attribute for lang-switcher
        content = content.replace('class="relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]" id="lang-switcher" class=', 'id="lang-switcher" class=')
    elif t == 'id="theme-switcher"':
        content = content.replace('class="relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]" id="theme-switcher"', 'id="theme-switcher" class="glass-island relative flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full gap-1 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]"')
    elif t == 'nav class="relative flex items-center bg-white/5':
        content = content.replace('nav class="relative flex items-center bg-white/5', 'nav class="glass-island relative flex items-center bg-white/5')
    elif t == '<div class="flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]">':
        content = content.replace(t, '<div class="glass-island flex items-center bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 p-1.5 rounded-full pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]">')
    elif t == 'id="mobile-menu-btn"':
        content = content.replace('id="mobile-menu-btn" class="lg:hidden p-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 hover:bg-white/10 transition-colors pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]"', 'id="mobile-menu-btn" class="glass-island lg:hidden p-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 hover:bg-white/10 transition-colors pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]"')

with open('index.html', 'w') as f:
    f.write(content)

