from html.parser import HTMLParser
import re
import json
import hashlib

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.output = []
        self.in_script_or_style = False
        self.dict_en = {}
        self.key_counter = 1

    def handle_starttag(self, tag, attrs):
        if tag in ['script', 'style', 'svg', 'path']:
            self.in_script_or_style = True
        
        attr_str = ""
        for k, v in attrs:
            if v is None:
                attr_str += f' {k}'
            else:
                # We should escape quotes, but let's assume original is mostly fine
                attr_str += f' {k}="{v}"'
        self.output.append(f"<{tag}{attr_str}>")

    def handle_startendtag(self, tag, attrs):
        attr_str = ""
        for k, v in attrs:
            if v is None:
                attr_str += f' {k}'
            else:
                attr_str += f' {k}="{v}"'
        self.output.append(f"<{tag}{attr_str} />")

    def handle_endtag(self, tag):
        if tag in ['script', 'style', 'svg', 'path']:
            self.in_script_or_style = False
        self.output.append(f"</{tag}>")

    def handle_data(self, data):
        if not self.in_script_or_style:
            t = data.strip()
            if t and len(t) > 1 and not re.match(r'^[0-9\W]+$', t):
                # We need to wrap it? No, if we wrap it in a span, we might break things.
                # Actually, rewriting HTML with HTMLParser drops formatting (like indentation).
                pass
        self.output.append(data)
        
    def handle_entityref(self, name):
        self.output.append(f"&{name};")
        
    def handle_charref(self, name):
        self.output.append(f"&#{name};")
        
    def handle_comment(self, data):
        self.output.append(f"<!--{data}-->")
        
    def handle_decl(self, decl):
        self.output.append(f"<!{decl}>")

    def handle_pi(self, data):
        self.output.append(f"<?{data}>")

# This is getting complicated because wrapping text nodes might break layout.
