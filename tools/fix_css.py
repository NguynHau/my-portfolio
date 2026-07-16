with open('style.css', 'r') as f:
    content = f.read()

# Replace border-radius: 16px with border-radius: 9999px
content = content.replace('border-radius: 16px !important;', 'border-radius: 9999px !important;')

with open('style.css', 'w') as f:
    f.write(content)
