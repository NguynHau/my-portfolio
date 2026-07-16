import { translations } from './translations.js';

let currentLang = 'en'; 
const originalTexts = new Map();

function translateTo(lang) {
  currentLang = lang;
  
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement && ['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) continue;
    
    let text = node.nodeValue;
    let trimmed = text.trim();
    if (!trimmed || trimmed.length <= 1) continue;
    
    if (!originalTexts.has(node)) {
      originalTexts.set(node, text);
    }
    
    const origText = originalTexts.get(node);
    const origTrimmed = origText.trim();
    
    if (lang === 'vi') {
      if (translations[origTrimmed]) {
        node.nodeValue = origText.replace(origTrimmed, translations[origTrimmed]);
      }
    } else {
      node.nodeValue = origText;
    }
  }

  // Update placeholders
  const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
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

  updateLangIndicator(lang);
}

function updateLangIndicator(lang) {
  const viBtn = document.getElementById('lang-vi-btn');
  const enBtn = document.getElementById('lang-en-btn');
  const indicator = document.getElementById('lang-indicator');
  
  if (viBtn && enBtn && indicator) {
    if (lang === 'vi') {
      viBtn.classList.add('text-white');
      viBtn.classList.remove('text-slate-400');
      enBtn.classList.remove('text-white');
      enBtn.classList.add('text-slate-400');
      
      indicator.style.left = `${viBtn.offsetLeft}px`;
      indicator.style.width = `${viBtn.offsetWidth}px`;
      indicator.style.top = `${viBtn.offsetTop}px`;
      indicator.style.height = `${viBtn.offsetHeight}px`;
    } else {
      enBtn.classList.add('text-white');
      enBtn.classList.remove('text-slate-400');
      viBtn.classList.remove('text-white');
      viBtn.classList.add('text-slate-400');
      
      indicator.style.left = `${enBtn.offsetLeft}px`;
      indicator.style.width = `${enBtn.offsetWidth}px`;
      indicator.style.top = `${enBtn.offsetTop}px`;
      indicator.style.height = `${enBtn.offsetHeight}px`;
    }
  }
}

function init() {
  // Ensure we wait for layouts to settle
  setTimeout(() => {
    translateTo('en'); 
  }, 100);
  
  const viBtn = document.getElementById('lang-vi-btn');
  const enBtn = document.getElementById('lang-en-btn');
  
  if (viBtn) viBtn.addEventListener('click', () => translateTo('vi'));
  if (enBtn) enBtn.addEventListener('click', () => translateTo('en'));

  window.addEventListener('resize', () => {
    updateLangIndicator(currentLang);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.translateTo = translateTo;
