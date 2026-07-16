with open('index.html', 'r') as f:
    content = f.read()

content = content.replace(
    '<!-- Main Script -->',
    '<!-- Main Script -->\n    <script type="module" src="./script.js"></script>\n    <script type="module" src="i18n.js"></script>'
)

with open('index.html', 'w') as f:
    f.write(content)
