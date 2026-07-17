// 1. Wait for document load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Interactive Cursor Spotlight Background
  const cursorSpotlight = document.getElementById('cursor-spotlight');
  if (cursorSpotlight) {
    window.addEventListener('mousemove', (e) => {
      cursorSpotlight.style.setProperty('--x', `${e.clientX}px`);
      cursorSpotlight.style.setProperty('--y', `${e.clientY}px`);
    });
  }

  // 3. Fallback Mechanism for the Portrait Image
  const profileImages = document.querySelectorAll('.profile-image');
  profileImages.forEach(img => {
    // Sequential fallback paths to handle local build, raw repository structure, and subpath deployment
    const fallbacks = [
      'anh2.jpg',
      'public/anh2.jpg',
      './public/anh2.jpg',
      './anh2.jpg'
    ];
    let attemptIndex = 0;

    img.addEventListener('error', () => {
      console.log('Image failed to load on attempt:', attemptIndex, img.src);
      attemptIndex++;
      if (attemptIndex < fallbacks.length) {
        img.setAttribute('src', fallbacks[attemptIndex]);
      } else {
        // Fallback to stylized vector SVG placeholder if all paths are exhausted
        img.style.display = 'none';
        const parent = img.parentElement;
        if (parent) {
          const placeholder = parent.querySelector('.profile-placeholder');
          if (placeholder) {
            placeholder.classList.remove('hidden');
          }
        }
      }
    });
  });

  // 4. Smooth Scroll Reveal (Intersection Observer)
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // If it's a staggered container, reveal its children sequentially
        const children = entry.target.querySelectorAll('.reveal-child');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('active');
          }, index * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-entry');
  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Contact Form Submission Simulation
  const contactForm = document.getElementById('contact-form');
  const modal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (contactForm && modal) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate submission animation
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin h-4 w-4 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing Collaboration request...
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          
          // Show custom success popup modal
          modal.classList.remove('pointer-events-none', 'opacity-0');
          modal.classList.add('opacity-100');
          contactForm.reset();
        }, 1200);
      }
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('pointer-events-none', 'opacity-0');
      modal.classList.remove('opacity-100');
    });
  }

  // 6. Mobile Navigation Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        menuBtn.innerHTML = `<i data-lucide="x" class="h-5 w-5 text-slate-300"></i>`;
      } else {
        mobileMenu.classList.add('hidden');
        menuBtn.innerHTML = `<i data-lucide="menu" class="h-5 w-5 text-slate-300"></i>`;
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // Close mobile menu on clicking any link
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        if (menuBtn) menuBtn.innerHTML = `<i data-lucide="menu" class="h-5 w-5 text-slate-300"></i>`;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  });

  // 7. Initializing Smooth Scrolling (Lenis) if available
  if (window.Lenis) {
    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 8. Navigation Active Section Tracker with Smooth Liquid Glass Slider
  const navLinks = document.querySelectorAll('nav a');
  const navIndicator = document.getElementById('nav-indicator');
  const sections = Array.from(navLinks).map(link => {
    const targetId = link.getAttribute('href');
    return targetId ? document.querySelector(targetId) : null;
  }).filter(Boolean);

  function updateActiveNav() {
    let currentActive = null;

    // Determine which section is currently active
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (window.scrollY >= top - 250) { // Offset for header height and safety margins
        currentActive = section;
      }
    });

    // Handle scroll to top or hero area
    if (window.scrollY < 200) {
      currentActive = null;
    }

    // Special case: if scrolled to the absolute bottom, select the last section (Contact)
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
      currentActive = sections[sections.length - 1];
    }

    let matched = false;
    navLinks.forEach(link => {
      const targetId = link.getAttribute('href');
      if (currentActive && targetId === `#${currentActive.id}`) {
        link.classList.add('active', 'text-white');
        link.classList.remove('text-slate-400');
        matched = true;
        
        // Move sliding background glass indicator
        if (navIndicator) {
          navIndicator.style.left = `${link.offsetLeft}px`;
          navIndicator.style.width = `${link.offsetWidth}px`;
          navIndicator.style.height = `${link.offsetHeight}px`;
          navIndicator.style.top = `${link.offsetTop}px`;
          navIndicator.style.opacity = '1';
        }
      } else {
        link.classList.remove('active', 'text-white');
        link.classList.add('text-slate-400');
      }
    });

    // If above all sections, hide the liquid glass indicator
    if (!matched && navIndicator) {
      navIndicator.style.opacity = '0';
    }
  }

  // Update position on scroll
  window.addEventListener('scroll', updateActiveNav);
  
  // Update position on resize (elements might change size or layout positions)
  window.addEventListener('resize', updateActiveNav);

  // Trigger position recalculation after a small delay to handle any content layout shifts
  setTimeout(updateActiveNav, 150);

  // Add instant click response so indicator glides immediately when navigation links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => {
        l.classList.remove('active', 'text-white');
        l.classList.add('text-slate-400');
      });
      link.classList.add('active', 'text-white');
      link.classList.remove('text-slate-400');
      
      if (navIndicator) {
        navIndicator.style.left = `${link.offsetLeft}px`;
        navIndicator.style.width = `${link.offsetWidth}px`;
        navIndicator.style.height = `${link.offsetHeight}px`;
        navIndicator.style.top = `${link.offsetTop}px`;
        navIndicator.style.opacity = '1';
      }
    });
  });

  // 9. Theme Switcher Logic
  const themeLightBtn = document.getElementById('theme-light-btn');
  const themeDarkBtn = document.getElementById('theme-dark-btn');
  const themeIndicator = document.getElementById('theme-indicator');
  const htmlEl = document.documentElement;

  function updateThemeIndicator(isLight) {
    if (themeIndicator && themeLightBtn && themeDarkBtn) {
      const activeBtn = isLight ? themeLightBtn : themeDarkBtn;
      const inactiveBtn = isLight ? themeDarkBtn : themeLightBtn;
      
      themeIndicator.style.left = `${activeBtn.offsetLeft}px`;
      themeIndicator.style.width = `${activeBtn.offsetWidth}px`;
      
      activeBtn.classList.add('text-white');
      activeBtn.classList.remove('text-slate-400');
      
      inactiveBtn.classList.remove('text-white');
      inactiveBtn.classList.add('text-slate-400');
    }
  }

  if (themeLightBtn && themeDarkBtn) {
    themeLightBtn.addEventListener('click', () => {
      htmlEl.classList.add('light-mode');
      updateThemeIndicator(true);
    });
    
    themeDarkBtn.addEventListener('click', () => {
      htmlEl.classList.remove('light-mode');
      updateThemeIndicator(false);
    });

    // initialize state
    setTimeout(() => {
      const isLight = htmlEl.classList.contains('light-mode');
      updateThemeIndicator(isLight);
    }, 100);
  }

  // 10. Glassmorphism Tuner Logic
  const tunerToggle = document.getElementById('glass-tuner-toggle');
  const tunerCard = document.getElementById('glass-tuner-card');
  const tunerClose = document.getElementById('glass-tuner-close');
  
  const rangeBgOpacity = document.getElementById('range-bg-opacity');
  const rangeBlur = document.getElementById('range-blur');
  const rangeBorderOpacity = document.getElementById('range-border-opacity');
  const rangeSaturate = document.getElementById('range-saturate');
  const rangeShadowOpacity = document.getElementById('range-shadow-opacity');
  const rangeInnerReflection = document.getElementById('range-inner-reflection');
  const rangeGlowSize = document.getElementById('range-glow-size');
  const rangeGlowOpacity = document.getElementById('range-glow-opacity');
  const rangeGlowColor = document.getElementById('range-glow-color');

  const valBgOpacity = document.getElementById('val-bg-opacity');
  const valBlur = document.getElementById('val-blur');
  const valBorderOpacity = document.getElementById('val-border-opacity');
  const valSaturate = document.getElementById('val-saturate');
  const valShadowOpacity = document.getElementById('val-shadow-opacity');
  const valInnerReflection = document.getElementById('val-inner-reflection');
  const valGlowSize = document.getElementById('val-glow-size');
  const valGlowOpacity = document.getElementById('val-glow-opacity');
  const valGlowColor = document.getElementById('val-glow-color');

  const cssPreview = document.getElementById('css-preview');
  const btnCopyCss = document.getElementById('btn-copy-css');
  const btnResetTuner = document.getElementById('btn-reset-tuner');
  const btnSaveSettings = document.getElementById('btn-save-settings');

  const defaultValues = {
    bgOpacity: '0.00',
    blur: '5.0',
    borderOpacity: '0.09',
    saturate: '95',
    shadowOpacity: '0.31',
    innerReflection: '0.15',
    glowSize: '0',
    glowOpacity: '0.20',
    glowColor: '#8b5cf6'
  };

  function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (tunerToggle && tunerCard) {
    // Toggle card visibility
    tunerToggle.addEventListener('click', () => {
      tunerCard.classList.toggle('hidden');
    });

    if (tunerClose) {
      tunerClose.addEventListener('click', () => {
        tunerCard.classList.add('hidden');
      });
    }

    // Update variables function
    function updateGlassProperties() {
      const bgOpacity = parseFloat(rangeBgOpacity.value).toFixed(2);
      const blur = parseFloat(rangeBlur.value).toFixed(1);
      const borderOpacity = parseFloat(rangeBorderOpacity.value).toFixed(2);
      const saturate = parseInt(rangeSaturate.value, 10);
      const shadowOpacity = parseFloat(rangeShadowOpacity.value).toFixed(2);
      
      const innerReflection = rangeInnerReflection ? parseFloat(rangeInnerReflection.value).toFixed(2) : defaultValues.innerReflection;
      const glowSize = rangeGlowSize ? parseFloat(rangeGlowSize.value).toFixed(1) : defaultValues.glowSize;
      const glowOpacity = rangeGlowOpacity ? parseFloat(rangeGlowOpacity.value).toFixed(2) : defaultValues.glowOpacity;
      const glowColorHex = rangeGlowColor ? rangeGlowColor.value : defaultValues.glowColor;
      
      const glowColorRgba = hexToRgba(glowColorHex, glowOpacity);

      // Set CSS Variables on document root
      htmlEl.style.setProperty('--glass-bg-opacity', bgOpacity);
      htmlEl.style.setProperty('--glass-blur', `${blur}px`);
      htmlEl.style.setProperty('--glass-border-opacity', borderOpacity);
      htmlEl.style.setProperty('--glass-saturate', `${saturate}%`);
      htmlEl.style.setProperty('--glass-shadow-opacity', shadowOpacity);
      htmlEl.style.setProperty('--glass-inner-reflection', innerReflection);
      htmlEl.style.setProperty('--glass-glow-size', `${glowSize}px`);
      htmlEl.style.setProperty('--glass-glow-color', glowColorRgba);

      // Update text indicators
      if (valBgOpacity) valBgOpacity.textContent = bgOpacity;
      if (valBlur) valBlur.textContent = `${blur}px`;
      if (valBorderOpacity) valBorderOpacity.textContent = borderOpacity;
      if (valSaturate) valSaturate.textContent = `${saturate}%`;
      if (valShadowOpacity) valShadowOpacity.textContent = shadowOpacity;
      
      if (valInnerReflection) valInnerReflection.textContent = innerReflection;
      if (valGlowSize) valGlowSize.textContent = `${glowSize}px`;
      if (valGlowOpacity) valGlowOpacity.textContent = glowOpacity;
      if (valGlowColor) valGlowColor.textContent = glowColorHex;

      // Update code preview
      if (cssPreview) {
        cssPreview.textContent = `:root {
  --glass-bg-opacity: ${bgOpacity};
  --glass-blur: ${blur}px;
  --glass-border-opacity: ${borderOpacity};
  --glass-saturate: ${saturate}%;
  --glass-shadow-opacity: ${shadowOpacity};
  --glass-inner-reflection: ${innerReflection};
  --glass-glow-size: ${glowSize}px;
  --glass-glow-color: ${glowColorRgba};
}`;
      }
    }

    // Load saved settings from localStorage
    function loadSavedSettings() {
      try {
        const saved = localStorage.getItem('glass-tuner-settings');
        if (saved) {
          const settings = JSON.parse(saved);
          if (rangeBgOpacity && settings.bgOpacity !== undefined) rangeBgOpacity.value = settings.bgOpacity;
          if (rangeBlur && settings.blur !== undefined) rangeBlur.value = settings.blur;
          if (rangeBorderOpacity && settings.borderOpacity !== undefined) rangeBorderOpacity.value = settings.borderOpacity;
          if (rangeSaturate && settings.saturate !== undefined) rangeSaturate.value = settings.saturate;
          if (rangeShadowOpacity && settings.shadowOpacity !== undefined) rangeShadowOpacity.value = settings.shadowOpacity;
          if (rangeInnerReflection && settings.innerReflection !== undefined) rangeInnerReflection.value = settings.innerReflection;
          if (rangeGlowSize && settings.glowSize !== undefined) rangeGlowSize.value = settings.glowSize;
          if (rangeGlowOpacity && settings.glowOpacity !== undefined) rangeGlowOpacity.value = settings.glowOpacity;
          if (rangeGlowColor && settings.glowColor !== undefined) rangeGlowColor.value = settings.glowColor;
        }
      } catch (e) {
        console.error('Error loading saved glass settings:', e);
      }
    }

    // Save settings to localStorage
    if (btnSaveSettings) {
      btnSaveSettings.addEventListener('click', () => {
        try {
          const settings = {
            bgOpacity: rangeBgOpacity.value,
            blur: rangeBlur.value,
            borderOpacity: rangeBorderOpacity.value,
            saturate: rangeSaturate.value,
            shadowOpacity: rangeShadowOpacity.value,
            innerReflection: rangeInnerReflection ? rangeInnerReflection.value : defaultValues.innerReflection,
            glowSize: rangeGlowSize ? rangeGlowSize.value : defaultValues.glowSize,
            glowOpacity: rangeGlowOpacity ? rangeGlowOpacity.value : defaultValues.glowOpacity,
            glowColor: rangeGlowColor ? rangeGlowColor.value : defaultValues.glowColor
          };
          localStorage.setItem('glass-tuner-settings', JSON.stringify(settings));
          
          // Visual confirmation
          const originalHTML = btnSaveSettings.innerHTML;
          btnSaveSettings.innerHTML = `<i data-lucide="check" class="h-3.5 w-3.5"></i> Đã lưu thành công!`;
          btnSaveSettings.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
          btnSaveSettings.classList.add('bg-teal-600');
          if (window.lucide) window.lucide.createIcons();
          
          setTimeout(() => {
            btnSaveSettings.innerHTML = originalHTML;
            btnSaveSettings.classList.remove('bg-teal-600');
            btnSaveSettings.classList.add('bg-emerald-600', 'hover:bg-emerald-500');
            if (window.lucide) window.lucide.createIcons();
          }, 2000);
        } catch (e) {
          console.error('Error saving glass settings:', e);
        }
      });
    }

    // Add listeners to ranges
    const inputs = [
      rangeBgOpacity, rangeBlur, rangeBorderOpacity, rangeSaturate, rangeShadowOpacity,
      rangeInnerReflection, rangeGlowSize, rangeGlowOpacity, rangeGlowColor
    ];
    inputs.forEach(input => {
      if (input) {
        input.addEventListener('input', updateGlassProperties);
      }
    });

    // Reset button functionality
    if (btnResetTuner) {
      btnResetTuner.addEventListener('click', () => {
        if (rangeBgOpacity) rangeBgOpacity.value = defaultValues.bgOpacity;
        if (rangeBlur) rangeBlur.value = defaultValues.blur;
        if (rangeBorderOpacity) rangeBorderOpacity.value = defaultValues.borderOpacity;
        if (rangeSaturate) rangeSaturate.value = defaultValues.saturate;
        if (rangeShadowOpacity) rangeShadowOpacity.value = defaultValues.shadowOpacity;
        if (rangeInnerReflection) rangeInnerReflection.value = defaultValues.innerReflection;
        if (rangeGlowSize) rangeGlowSize.value = defaultValues.glowSize;
        if (rangeGlowOpacity) rangeGlowOpacity.value = defaultValues.glowOpacity;
        if (rangeGlowColor) rangeGlowColor.value = defaultValues.glowColor;
        
        updateGlassProperties();
      });
    }

    // Copy to clipboard functionality
    if (btnCopyCss) {
      btnCopyCss.addEventListener('click', () => {
        if (cssPreview) {
          navigator.clipboard.writeText(cssPreview.textContent).then(() => {
            const originalHTML = btnCopyCss.innerHTML;
            btnCopyCss.innerHTML = `<i data-lucide="check" class="h-3 w-3"></i> Copied!`;
            if (window.lucide) window.lucide.createIcons();
            
            setTimeout(() => {
              btnCopyCss.innerHTML = originalHTML;
              if (window.lucide) window.lucide.createIcons();
            }, 1500);
          }).catch(err => {
            console.error('Failed to copy text: ', err);
          });
        }
      });
    }

    // Boot-up initialization sequence
    loadSavedSettings();
    updateGlassProperties();
  }
});
