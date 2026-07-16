with open('index.html', 'r') as f:
    content = f.read()

content = content.replace('-white/5', '')
content = content.replace('-white/10', '')
content = content.replace('shadow-[0_8px_32px_rgba(0,0,0,0.3)]', '')

with open('index.html', 'w') as f:
    f.write(content)
