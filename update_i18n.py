with open('i18n.js', 'r') as f:
    content = f.read()

target = """  const viBtn = document.getElementById('lang-vi-btn');"""

replacement = """  const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
  inputs.forEach(input => {
    if (!originalTexts.has(input)) {
      originalTexts.set(input, input.getAttribute('placeholder'));
    }
    const origPlaceholder = originalTexts.get(input);
    if (lang === 'vi') {
      if (translations[origPlaceholder]) {
        input.setAttribute('placeholder', translations[origPlaceholder]);
      }
    } else {
      input.setAttribute('placeholder', origPlaceholder);
    }
  });

  const viBtn = document.getElementById('lang-vi-btn');"""

if target in content:
    content = content.replace(target, replacement)
    print("Replaced")

with open('i18n.js', 'w') as f:
    f.write(content)
