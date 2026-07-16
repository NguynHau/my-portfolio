import json

with open('texts.json', 'r') as f:
    texts = json.load(f)

# Let's write them to a JS file
print("const translations = {")
for t in texts:
    print(f'  {json.dumps(t)}: {json.dumps(t)},')
print("};")
