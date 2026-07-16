import re

with open('index.html', 'r') as f:
    content = f.read()

# Remove the script tag
content = re.sub(
    r'<script[^>]*src="\./assets/index[^>]*\.js"[^>]*></script>',
    '',
    content
)
# Replace the link tag
content = re.sub(
    r'<link[^>]*href="\./assets/index[^>]*\.css"[^>]*/>',
    '<link rel="stylesheet" href="style.css" />',
    content
)

with open('index.html', 'w') as f:
    f.write(content)
