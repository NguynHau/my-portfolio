import re

with open('index.html', 'r') as f:
    content = f.read()

# Remove the specific tailwind classes that conflict with glassmorphism
classes_to_remove = [
    'bg-white/5',
    'border',
    'border-white/5',
    'border-white/10',
    'backdrop-blur-2xl',
    'backdrop-saturate-150',
    'shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
    'rounded-full',
    'hover:bg-white/10'
]

def replace_classes(match):
    full_str = match.group(0)
    for c in classes_to_remove:
        # replace class word, ensuring word boundaries
        full_str = re.sub(r'\b' + re.escape(c) + r'\b', '', full_str)
    # clean up extra spaces
    full_str = re.sub(r' +', ' ', full_str)
    return full_str

# Only apply to elements with glass-island
content = re.sub(r'class="[^"]*glass-island[^"]*"', replace_classes, content)

with open('index.html', 'w') as f:
    f.write(content)
