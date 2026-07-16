from html.parser import HTMLParser
import re
import json

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.texts = []
        self.in_script_or_style = False

    def handle_starttag(self, tag, attrs):
        if tag in ['script', 'style', 'svg', 'path']:
            self.in_script_or_style = True

    def handle_endtag(self, tag):
        if tag in ['script', 'style', 'svg', 'path']:
            self.in_script_or_style = False

    def handle_data(self, data):
        if not self.in_script_or_style:
            t = data.strip()
            if t and len(t) > 1 and not re.match(r'^[0-9\W]+$', t):
                self.texts.append(t)

parser = MyHTMLParser()
with open('index.html', 'r') as f:
    parser.feed(f.read())

texts = sorted(list(set(parser.texts)))
print(f"Found {len(texts)} unique strings")
with open('texts.json', 'w') as f:
    json.dump(texts, f, indent=2)
