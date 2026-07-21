// 1. Wait for document load
document.addEventListener('DOMContentLoaded', () => {
  // Inject Disable Effects Styles
  const styleEl = document.createElement('style');
  styleEl.id = 'disable-effects-styles';
  styleEl.textContent = `
    .disable-effects,
    .disable-effects * {
      animation: none !important;
      animation-delay: 0s !important;
      animation-duration: 0s !important;
      transition: none !important;
      transition-delay: 0s !important;
      transition-duration: 0s !important;
    }
    .disable-effects .reveal-entry,
    .disable-effects .reveal-child {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
    .disable-effects #constellation-canvas {
      display: none !important;
    }
    .disable-effects #nav-indicator {
      display: none !important;
    }
    .disable-effects .liquid-glass {
      background: rgba(15, 23, 42, 0.95) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      border-color: rgba(255, 255, 255, 0.1) !important;
      box-shadow: none !important;
      transform: none !important;
    }
    .disable-effects .glass-island {
      background: rgba(15, 23, 42, 0.95) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      border-color: rgba(255, 255, 255, 0.1) !important;
      box-shadow: none !important;
      transform: scale(0.9) !important;
    }
    .disable-effects.light-mode .liquid-glass,
    html.light-mode .disable-effects .liquid-glass {
      background: #f8fafc !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      border-color: rgba(0, 0, 0, 0.1) !important;
      box-shadow: none !important;
      transform: none !important;
    }
    .disable-effects.light-mode .glass-island,
    html.light-mode .disable-effects .glass-island {
      background: #f8fafc !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      border-color: rgba(0, 0, 0, 0.1) !important;
      box-shadow: none !important;
      transform: scale(0.9) !important;
    }
  `;
  document.head.appendChild(styleEl);

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }



  // 3. Fallback Mechanism for the Portrait Image
  const profileImages = document.querySelectorAll('.profile-image');
  profileImages.forEach(img => {
    // Sequential fallback paths to handle local build, raw repository structure, and subpath deployment
    const fallbacks = [
      'https://res.cloudinary.com/zaowbcqq/image/upload/v1784529112/anh2_rkqquc.jpg'
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

  // 3.1 Fallback Mechanism for the Brunei Exchange Image
  const bruneiImages = document.querySelectorAll('.brunei-image');
  bruneiImages.forEach(img => {
    const checkBruneiImage = () => {
      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
        img.style.display = 'none';
        const parent = img.parentElement;
        if (parent) {
          const placeholder = parent.querySelector('.brunei-placeholder');
          if (placeholder) {
            placeholder.classList.remove('hidden');
            placeholder.classList.add('flex');
          }
        }
      } else {
        img.style.display = 'block';
        const parent = img.parentElement;
        if (parent) {
          const placeholder = parent.querySelector('.brunei-placeholder');
          if (placeholder) {
            placeholder.classList.add('hidden');
            placeholder.classList.remove('flex');
          }
        }
      }
    };

    img.addEventListener('load', checkBruneiImage);
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const parent = img.parentElement;
      if (parent) {
        const placeholder = parent.querySelector('.brunei-placeholder');
        if (placeholder) {
          placeholder.classList.remove('hidden');
          placeholder.classList.add('flex');
        }
      }
    });

    if (img.complete) {
      checkBruneiImage();
    }
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
  let lenisInstance = null;
  function initLenis() {
    if (window.Lenis && !document.documentElement.classList.contains('disable-effects')) {
      if (!lenisInstance) {
        lenisInstance = new window.Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        
        function raf(time) {
          if (lenisInstance && !document.documentElement.classList.contains('disable-effects')) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
          }
        }
        requestAnimationFrame(raf);
      }
    } else {
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    }
  }
  initLenis();

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
  
  const mobileThemeLightBtn = document.getElementById('mobile-theme-light-btn');
  const mobileThemeDarkBtn = document.getElementById('mobile-theme-dark-btn');
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

    // Update mobile active state
    if (mobileThemeLightBtn && mobileThemeDarkBtn) {
      if (isLight) {
        mobileThemeLightBtn.classList.add('text-white', 'bg-white/10', 'border', 'border-white/15', 'shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]');
        mobileThemeLightBtn.classList.remove('text-slate-400', 'bg-transparent', 'border-transparent', 'shadow-none');
        
        mobileThemeDarkBtn.classList.remove('text-white', 'bg-white/10', 'border', 'border-white/15', 'shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]');
        mobileThemeDarkBtn.classList.add('text-slate-400', 'bg-transparent', 'border-transparent', 'shadow-none');
      } else {
        mobileThemeDarkBtn.classList.add('text-white', 'bg-white/10', 'border', 'border-white/15', 'shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]');
        mobileThemeDarkBtn.classList.remove('text-slate-400', 'bg-transparent', 'border-transparent', 'shadow-none');
        
        mobileThemeLightBtn.classList.remove('text-white', 'bg-white/10', 'border', 'border-white/15', 'shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]');
        mobileThemeLightBtn.classList.add('text-slate-400', 'bg-transparent', 'border-transparent', 'shadow-none');
      }
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

    if (mobileThemeLightBtn) {
      mobileThemeLightBtn.addEventListener('click', () => {
        htmlEl.classList.add('light-mode');
        updateThemeIndicator(true);
      });
    }

    if (mobileThemeDarkBtn) {
      mobileThemeDarkBtn.addEventListener('click', () => {
        htmlEl.classList.remove('light-mode');
        updateThemeIndicator(false);
      });
    }

    // initialize state
    setTimeout(() => {
      const isLight = htmlEl.classList.contains('light-mode');
      updateThemeIndicator(isLight);
    }, 100);
  }

  // 10. Dual-Tuner Control Logic (Background Stars & Glass Islands)
  // Background Star Tuner elements
  const bgTunerToggle = document.getElementById('bg-tuner-toggle');
  const bgTunerCard = document.getElementById('bg-tuner-card');
  const bgTunerClose = document.getElementById('bg-tuner-close');

  const rangeConstellationSize = document.getElementById('range-constellation-size');
  const rangeStarDensity = document.getElementById('range-star-density');
  const rangeStarSpeed = document.getElementById('range-star-speed');
  const rangeLinkRadius = document.getElementById('range-link-radius');

  const valConstellationSize = document.getElementById('val-constellation-size');
  const valStarDensity = document.getElementById('val-star-density');
  const valStarSpeed = document.getElementById('val-star-speed');
  const valLinkRadius = document.getElementById('val-link-radius');

  const btnToggleStars = document.getElementById('btn-toggle-stars');
  const starsToggleKnob = document.getElementById('stars-toggle-knob');

  const btnSaveStars = document.getElementById('btn-save-stars');
  const btnCopyStars = document.getElementById('btn-copy-stars');
  const btnResetStars = document.getElementById('btn-reset-stars');

  // Glass Island Tuner elements
  const islandTunerToggle = document.getElementById('island-tuner-toggle');
  const islandTunerCard = document.getElementById('island-tuner-card');
  const islandTunerClose = document.getElementById('island-tuner-close');

  const rangeBgOpacity = document.getElementById('range-bg-opacity');
  const rangeBlur = document.getElementById('range-blur');
  const rangeBorderOpacity = document.getElementById('range-border-opacity');
  const rangeSaturate = document.getElementById('range-saturate');
  const rangeShadowOpacity = document.getElementById('range-shadow-opacity');
  const rangeInnerReflection = document.getElementById('range-inner-reflection');
  const rangeGlowSize = document.getElementById('range-glow-size');
  const rangeGlowOpacity = document.getElementById('range-glow-opacity');
  const rangeGlowColor = document.getElementById('range-glow-color');
  const rangeIslandScale = document.getElementById('range-island-scale');

  const rangeShiftLang = document.getElementById('range-shift-lang');
  const rangeShiftTheme = document.getElementById('range-shift-theme');
  const rangeShiftNav = document.getElementById('range-shift-nav');
  const rangeShiftOrcid = document.getElementById('range-shift-orcid');
  const rangeShiftMobile = document.getElementById('range-shift-mobile');

  const valBgOpacity = document.getElementById('val-bg-opacity');
  const valBlur = document.getElementById('val-blur');
  const valBorderOpacity = document.getElementById('val-border-opacity');
  const valSaturate = document.getElementById('val-saturate');
  const valShadowOpacity = document.getElementById('val-shadow-opacity');
  const valInnerReflection = document.getElementById('val-inner-reflection');
  const valGlowSize = document.getElementById('val-glow-size');
  const valGlowOpacity = document.getElementById('val-glow-opacity');
  const valGlowColor = document.getElementById('val-glow-color');
  const valIslandScale = document.getElementById('val-island-scale');

  const valShiftLang = document.getElementById('val-shift-lang');
  const valShiftTheme = document.getElementById('val-shift-theme');
  const valShiftNav = document.getElementById('val-shift-nav');
  const valShiftOrcid = document.getElementById('val-shift-orcid');
  const valShiftMobile = document.getElementById('val-shift-mobile');

  const btnToggleIslands = document.getElementById('btn-toggle-islands');
  const islandsToggleKnob = document.getElementById('islands-toggle-knob');

  const btnSaveIslands = document.getElementById('btn-save-islands');
  const btnCopyIslands = document.getElementById('btn-copy-islands');
  const btnResetIslands = document.getElementById('btn-reset-islands');
  const cssPreviewIslands = document.getElementById('css-preview-islands');

  // Default parameters
  const defaultBgValues = {
    constellationSize: '8',
    starDensity: '80',
    starSpeed: '0.5',
    linkRadius: '220'
  };

  const defaultIslandValues = {
    bgOpacity: '0.00',
    blur: '5.0',
    borderOpacity: '0.09',
    saturate: '95',
    shadowOpacity: '0.31',
    innerReflection: '0.15',
    glowSize: '0.0',
    glowOpacity: '0.20',
    glowColor: '#8b5cf6',
    islandScale: '1.04',
    shiftLang: '-15',
    shiftTheme: '-22',
    shiftNav: '27',
    shiftOrcid: '12',
    shiftMobile: '2'
  };

  // Shared Animation Config State
  const starConfig = {
    size: 8,
    density: 80,
    speed: 0.5,
    radius: 220,
    r: 139,
    g: 92,
    b: 246
  };
  
  let initParticlesFn = null;

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

  // Card toggle behaviors
  if (bgTunerToggle && bgTunerCard) {
    bgTunerToggle.addEventListener('click', () => {
      bgTunerCard.classList.toggle('hidden');
      if (islandTunerCard) islandTunerCard.classList.add('hidden');
    });
  }

  if (bgTunerClose && bgTunerCard) {
    bgTunerClose.addEventListener('click', () => {
      bgTunerCard.classList.add('hidden');
    });
  }

  if (islandTunerToggle && islandTunerCard) {
    islandTunerToggle.addEventListener('click', () => {
      islandTunerCard.classList.toggle('hidden');
      if (bgTunerCard) bgTunerCard.classList.add('hidden');
    });
  }

  if (islandTunerClose && islandTunerCard) {
    islandTunerClose.addEventListener('click', () => {
      islandTunerCard.classList.add('hidden');
    });
  }

  // Update background properties
  function updateStarsProperties() {
    const constellationSize = rangeConstellationSize ? parseInt(rangeConstellationSize.value, 10) : parseInt(defaultBgValues.constellationSize, 10);
    const starDensity = rangeStarDensity ? parseInt(rangeStarDensity.value, 10) : parseInt(defaultBgValues.starDensity, 10);
    const starSpeed = rangeStarSpeed ? parseFloat(rangeStarSpeed.value).toFixed(2) : parseFloat(defaultBgValues.starSpeed).toFixed(2);
    const linkRadius = rangeLinkRadius ? parseInt(rangeLinkRadius.value, 10) : parseInt(defaultBgValues.linkRadius, 10);

    // Update text indicators
    if (valConstellationSize) valConstellationSize.textContent = constellationSize;
    if (valStarDensity) valStarDensity.textContent = starDensity;
    if (valStarSpeed) valStarSpeed.textContent = starSpeed;
    if (valLinkRadius) valLinkRadius.textContent = `${linkRadius}px`;

    // Sync with global animation state
    starConfig.size = constellationSize;
    starConfig.density = starDensity;
    starConfig.speed = parseFloat(starSpeed);
    starConfig.radius = linkRadius;

    // Reinitialize particles if density changes
    if (initParticlesFn) {
      initParticlesFn();
    }
  }

  // Update glass islands properties
  function updateIslandsProperties() {
    const bgOpacity = parseFloat(rangeBgOpacity.value).toFixed(2);
    const blur = parseFloat(rangeBlur.value).toFixed(1);
    const borderOpacity = parseFloat(rangeBorderOpacity.value).toFixed(2);
    const saturate = parseInt(rangeSaturate.value, 10);
    const shadowOpacity = parseFloat(rangeShadowOpacity.value).toFixed(2);
    
    const innerReflection = rangeInnerReflection ? parseFloat(rangeInnerReflection.value).toFixed(2) : defaultIslandValues.innerReflection;
    const glowSize = rangeGlowSize ? parseFloat(rangeGlowSize.value).toFixed(1) : defaultIslandValues.glowSize;
    const glowOpacity = rangeGlowOpacity ? parseFloat(rangeGlowOpacity.value).toFixed(2) : defaultIslandValues.glowOpacity;
    const glowColorHex = rangeGlowColor ? rangeGlowColor.value : defaultIslandValues.glowColor;
    
    const glowColorRgba = hexToRgba(glowColorHex, glowOpacity);

    // Island Scale & Layout translations
    const islandScale = rangeIslandScale ? parseFloat(rangeIslandScale.value).toFixed(2) : defaultIslandValues.islandScale;
    const shiftLang = rangeShiftLang ? parseInt(rangeShiftLang.value, 10) : parseInt(defaultIslandValues.shiftLang, 10);
    const shiftTheme = rangeShiftTheme ? parseInt(rangeShiftTheme.value, 10) : parseInt(defaultIslandValues.shiftTheme, 10);
    const shiftNav = rangeShiftNav ? parseInt(rangeShiftNav.value, 10) : parseInt(defaultIslandValues.shiftNav, 10);
    const shiftOrcid = rangeShiftOrcid ? parseInt(rangeShiftOrcid.value, 10) : parseInt(defaultIslandValues.shiftOrcid, 10);
    const shiftMobile = rangeShiftMobile ? parseInt(rangeShiftMobile.value, 10) : parseInt(defaultIslandValues.shiftMobile, 10);

    // Set CSS Variables on document root
    htmlEl.style.setProperty('--glass-bg-opacity', bgOpacity);
    htmlEl.style.setProperty('--glass-blur', `${blur}px`);
    htmlEl.style.setProperty('--glass-border-opacity', borderOpacity);
    htmlEl.style.setProperty('--glass-saturate', `${saturate}%`);
    htmlEl.style.setProperty('--glass-shadow-opacity', shadowOpacity);
    htmlEl.style.setProperty('--glass-inner-reflection', innerReflection);
    htmlEl.style.setProperty('--glass-glow-size', `${glowSize}px`);
    htmlEl.style.setProperty('--glass-glow-color', glowColorRgba);
    
    htmlEl.style.setProperty('--island-scale', islandScale);
    htmlEl.style.setProperty('--lang-shift', `${shiftLang}px`);
    htmlEl.style.setProperty('--theme-shift', `${shiftTheme}px`);
    htmlEl.style.setProperty('--nav-shift', `${shiftNav}px`);
    htmlEl.style.setProperty('--orcid-shift', `${shiftOrcid}px`);
    htmlEl.style.setProperty('--mobile-shift', `${shiftMobile}px`);

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
    
    if (valIslandScale) valIslandScale.textContent = `${islandScale}x`;
    if (valShiftLang) valShiftLang.textContent = `${shiftLang}px`;
    if (valShiftTheme) valShiftTheme.textContent = `${shiftTheme}px`;
    if (valShiftNav) valShiftNav.textContent = `${shiftNav}px`;
    if (valShiftOrcid) valShiftOrcid.textContent = `${shiftOrcid}px`;
    if (valShiftMobile) valShiftMobile.textContent = `${shiftMobile}px`;

    // Sync constellation theme color with glow color
    const cleanHex = glowColorHex.replace('#', '');
    if (cleanHex.length === 6) {
      starConfig.r = parseInt(cleanHex.substring(0, 2), 16);
      starConfig.g = parseInt(cleanHex.substring(2, 4), 16);
      starConfig.b = parseInt(cleanHex.substring(4, 6), 16);
    } else {
      starConfig.r = 139;
      starConfig.g = 92;
      starConfig.b = 246;
    }

    // Update islands CSS preview block
    if (cssPreviewIslands) {
      cssPreviewIslands.textContent = `:root {
  --glass-bg-opacity: ${bgOpacity};
  --glass-blur: ${blur}px;
  --glass-border-opacity: ${borderOpacity};
  --glass-saturate: ${saturate}%;
  --glass-shadow-opacity: ${shadowOpacity};
  --glass-inner-reflection: ${innerReflection};
  --glass-glow-size: ${glowSize}px;
  --glass-glow-color: ${glowColorRgba};
  --island-scale: ${islandScale};
  --lang-shift: ${shiftLang}px;
  --theme-shift: ${shiftTheme}px;
  --nav-shift: ${shiftNav}px;
  --orcid-shift: ${shiftOrcid}px;
  --mobile-shift: ${shiftMobile}px;
}`;
    }
  }

  // Load saved settings from localStorage
  function loadSavedSettings() {
    try {
      // 1. Load Background Star settings
      const savedBg = localStorage.getItem('bg-tuner-settings');
      if (savedBg) {
        const bgSettings = JSON.parse(savedBg);
        if (rangeConstellationSize && bgSettings.constellationSize !== undefined) rangeConstellationSize.value = bgSettings.constellationSize;
        if (rangeStarDensity && bgSettings.starDensity !== undefined) rangeStarDensity.value = bgSettings.starDensity;
        if (rangeStarSpeed && bgSettings.starSpeed !== undefined) rangeStarSpeed.value = bgSettings.starSpeed;
        if (rangeLinkRadius && bgSettings.linkRadius !== undefined) rangeLinkRadius.value = bgSettings.linkRadius;
      }

      // 2. Load Islands settings
      const savedIslands = localStorage.getItem('island-tuner-settings');
      if (savedIslands) {
        const islandSettings = JSON.parse(savedIslands);
        if (rangeBgOpacity && islandSettings.bgOpacity !== undefined) rangeBgOpacity.value = islandSettings.bgOpacity;
        if (rangeBlur && islandSettings.blur !== undefined) rangeBlur.value = islandSettings.blur;
        if (rangeBorderOpacity && islandSettings.borderOpacity !== undefined) rangeBorderOpacity.value = islandSettings.borderOpacity;
        if (rangeSaturate && islandSettings.saturate !== undefined) rangeSaturate.value = islandSettings.saturate;
        if (rangeShadowOpacity && islandSettings.shadowOpacity !== undefined) rangeShadowOpacity.value = islandSettings.shadowOpacity;
        if (rangeInnerReflection && islandSettings.innerReflection !== undefined) rangeInnerReflection.value = islandSettings.innerReflection;
        if (rangeGlowSize && islandSettings.glowSize !== undefined) rangeGlowSize.value = islandSettings.glowSize;
        if (rangeGlowOpacity && islandSettings.glowOpacity !== undefined) rangeGlowOpacity.value = islandSettings.glowOpacity;
        if (rangeGlowColor && islandSettings.glowColor !== undefined) rangeGlowColor.value = islandSettings.glowColor;
        
        if (rangeIslandScale && islandSettings.islandScale !== undefined) rangeIslandScale.value = islandSettings.islandScale;
        if (rangeShiftLang && islandSettings.shiftLang !== undefined) rangeShiftLang.value = islandSettings.shiftLang;
        if (rangeShiftTheme && islandSettings.shiftTheme !== undefined) rangeShiftTheme.value = islandSettings.shiftTheme;
        if (rangeShiftNav && islandSettings.shiftNav !== undefined) rangeShiftNav.value = islandSettings.shiftNav;
        if (rangeShiftOrcid && islandSettings.shiftOrcid !== undefined) rangeShiftOrcid.value = islandSettings.shiftOrcid;
        if (rangeShiftMobile && islandSettings.shiftMobile !== undefined) rangeShiftMobile.value = islandSettings.shiftMobile;
      }
    } catch (e) {
      console.error('Error loading saved glass/background settings:', e);
    }
  }

  // Save buttons event handlers
  if (btnSaveStars) {
    btnSaveStars.addEventListener('click', () => {
      try {
        const bgSettings = {
          constellationSize: rangeConstellationSize.value,
          starDensity: rangeStarDensity.value,
          starSpeed: rangeStarSpeed.value,
          linkRadius: rangeLinkRadius.value
        };
        localStorage.setItem('bg-tuner-settings', JSON.stringify(bgSettings));
        
        const originalHTML = btnSaveStars.innerHTML;
        btnSaveStars.innerHTML = `<i data-lucide="check" class="h-3.5 w-3.5"></i> Đã lưu!`;
        btnSaveStars.classList.remove('bg-blue-600', 'hover:bg-blue-500');
        btnSaveStars.classList.add('bg-teal-600');
        if (window.lucide) window.lucide.createIcons();
        
        setTimeout(() => {
          btnSaveStars.innerHTML = originalHTML;
          btnSaveStars.classList.remove('bg-teal-600');
          btnSaveStars.classList.add('bg-blue-600', 'hover:bg-blue-500');
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      } catch (e) {
        console.error('Error saving stars settings:', e);
      }
    });
  }

  if (btnSaveIslands) {
    btnSaveIslands.addEventListener('click', () => {
      try {
        const islandSettings = {
          bgOpacity: rangeBgOpacity.value,
          blur: rangeBlur.value,
          borderOpacity: rangeBorderOpacity.value,
          saturate: rangeSaturate.value,
          shadowOpacity: rangeShadowOpacity.value,
          innerReflection: rangeInnerReflection ? rangeInnerReflection.value : defaultIslandValues.innerReflection,
          glowSize: rangeGlowSize ? rangeGlowSize.value : defaultIslandValues.glowSize,
          glowOpacity: rangeGlowOpacity ? rangeGlowOpacity.value : defaultIslandValues.glowOpacity,
          glowColor: rangeGlowColor ? rangeGlowColor.value : defaultIslandValues.glowColor,
          islandScale: rangeIslandScale ? rangeIslandScale.value : defaultIslandValues.islandScale,
          shiftLang: rangeShiftLang ? rangeShiftLang.value : defaultIslandValues.shiftLang,
          shiftTheme: rangeShiftTheme ? rangeShiftTheme.value : defaultIslandValues.shiftTheme,
          shiftNav: rangeShiftNav ? rangeShiftNav.value : defaultIslandValues.shiftNav,
          shiftOrcid: rangeShiftOrcid ? rangeShiftOrcid.value : defaultIslandValues.shiftOrcid,
          shiftMobile: rangeShiftMobile ? rangeShiftMobile.value : defaultIslandValues.shiftMobile
        };
        localStorage.setItem('island-tuner-settings', JSON.stringify(islandSettings));
        
        const originalHTML = btnSaveIslands.innerHTML;
        btnSaveIslands.innerHTML = `<i data-lucide="check" class="h-3.5 w-3.5"></i> Đã lưu!`;
        btnSaveIslands.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
        btnSaveIslands.classList.add('bg-teal-600');
        if (window.lucide) window.lucide.createIcons();
        
        setTimeout(() => {
          btnSaveIslands.innerHTML = originalHTML;
          btnSaveIslands.classList.remove('bg-teal-600');
          btnSaveIslands.classList.add('bg-emerald-600', 'hover:bg-emerald-500');
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      } catch (e) {
        console.error('Error saving islands settings:', e);
      }
    });
  }

  // Range Listeners setup
  const starInputs = [rangeConstellationSize, rangeStarDensity, rangeStarSpeed, rangeLinkRadius];
  starInputs.forEach(input => {
    if (input) input.addEventListener('input', updateStarsProperties);
  });

  const islandInputs = [
    rangeBgOpacity, rangeBlur, rangeBorderOpacity, rangeSaturate, rangeShadowOpacity,
    rangeInnerReflection, rangeGlowSize, rangeGlowOpacity, rangeGlowColor,
    rangeIslandScale, rangeShiftLang, rangeShiftTheme, rangeShiftNav, rangeShiftOrcid, rangeShiftMobile
  ];
  islandInputs.forEach(input => {
    if (input) input.addEventListener('input', updateIslandsProperties);
  });

  // Reset actions
  if (btnResetStars) {
    btnResetStars.addEventListener('click', () => {
      if (rangeConstellationSize) rangeConstellationSize.value = defaultBgValues.constellationSize;
      if (rangeStarDensity) rangeStarDensity.value = defaultBgValues.starDensity;
      if (rangeStarSpeed) rangeStarSpeed.value = defaultBgValues.starSpeed;
      if (rangeLinkRadius) rangeLinkRadius.value = defaultBgValues.linkRadius;
      updateStarsProperties();
    });
  }

  if (btnResetIslands) {
    btnResetIslands.addEventListener('click', () => {
      if (rangeBgOpacity) rangeBgOpacity.value = defaultIslandValues.bgOpacity;
      if (rangeBlur) rangeBlur.value = defaultIslandValues.blur;
      if (rangeBorderOpacity) rangeBorderOpacity.value = defaultIslandValues.borderOpacity;
      if (rangeSaturate) rangeSaturate.value = defaultIslandValues.saturate;
      if (rangeShadowOpacity) rangeShadowOpacity.value = defaultIslandValues.shadowOpacity;
      if (rangeInnerReflection) rangeInnerReflection.value = defaultIslandValues.innerReflection;
      if (rangeGlowSize) rangeGlowSize.value = defaultIslandValues.glowSize;
      if (rangeGlowOpacity) rangeGlowOpacity.value = defaultIslandValues.glowOpacity;
      if (rangeGlowColor) rangeGlowColor.value = defaultIslandValues.glowColor;
      if (rangeIslandScale) rangeIslandScale.value = defaultIslandValues.islandScale;
      
      if (rangeShiftLang) rangeShiftLang.value = defaultIslandValues.shiftLang;
      if (rangeShiftTheme) rangeShiftTheme.value = defaultIslandValues.shiftTheme;
      if (rangeShiftNav) rangeShiftNav.value = defaultIslandValues.shiftNav;
      if (rangeShiftOrcid) rangeShiftOrcid.value = defaultIslandValues.shiftOrcid;
      if (rangeShiftMobile) rangeShiftMobile.value = defaultIslandValues.shiftMobile;
      
      updateIslandsProperties();
    });
  }

  // Clipboard Copiers
  if (btnCopyStars) {
    btnCopyStars.addEventListener('click', () => {
      const configText = `/* Star Background Configuration */\nConstellation Size: ${rangeConstellationSize.value}\nStar Density: ${rangeStarDensity.value}\nStar Speed: ${rangeStarSpeed.value}\nLink Radius: ${rangeLinkRadius.value}px`;
      navigator.clipboard.writeText(configText).then(() => {
        const originalHTML = btnCopyStars.innerHTML;
        btnCopyStars.innerHTML = `<i data-lucide="check" class="h-3 w-3"></i> Copied!`;
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          btnCopyStars.innerHTML = originalHTML;
          if (window.lucide) window.lucide.createIcons();
        }, 1500);
      }).catch(err => console.error('Failed to copy stars config: ', err));
    });
  }

  if (btnCopyIslands) {
    btnCopyIslands.addEventListener('click', () => {
      if (cssPreviewIslands) {
        navigator.clipboard.writeText(cssPreviewIslands.textContent).then(() => {
          const originalHTML = btnCopyIslands.innerHTML;
          btnCopyIslands.innerHTML = `<i data-lucide="check" class="h-3 w-3"></i> Copied!`;
          if (window.lucide) window.lucide.createIcons();
          setTimeout(() => {
            btnCopyIslands.innerHTML = originalHTML;
            if (window.lucide) window.lucide.createIcons();
          }, 1500);
        }).catch(err => console.error('Failed to copy islands CSS: ', err));
      }
    });
  }

  // Switches/Toggles implementations
  let starsDisabled = localStorage.getItem('disable-stars') === 'true';
  function updateStarsUI() {
    const canvas = document.getElementById('constellation-canvas');
    const globalHeroBg = document.getElementById('global-hero-bg');
    const localHeroBg = document.getElementById('local-hero-bg');
    if (starsDisabled) {
      if (canvas) canvas.style.display = 'none';
      if (globalHeroBg) globalHeroBg.classList.remove('hidden');
      if (localHeroBg) localHeroBg.classList.add('hidden');
      if (btnToggleStars && starsToggleKnob) {
        btnToggleStars.classList.remove('bg-blue-600');
        btnToggleStars.classList.add('bg-white/10');
        starsToggleKnob.classList.remove('translate-x-5');
        starsToggleKnob.classList.add('translate-x-0');
      }
    } else {
      if (canvas) canvas.style.display = 'block';
      if (globalHeroBg) globalHeroBg.classList.add('hidden');
      if (localHeroBg) localHeroBg.classList.remove('hidden');
      if (btnToggleStars && starsToggleKnob) {
        btnToggleStars.classList.remove('bg-white/10');
        btnToggleStars.classList.add('bg-blue-600');
        starsToggleKnob.classList.remove('translate-x-0');
        starsToggleKnob.classList.add('translate-x-5');
      }
    }
  }

  if (btnToggleStars) {
    btnToggleStars.addEventListener('click', () => {
      starsDisabled = !starsDisabled;
      localStorage.setItem('disable-stars', starsDisabled);
      updateStarsUI();
    });
  }

  let islandsDisabled = localStorage.getItem('disable-islands') === 'true';
  function updateIslandsUI() {
    if (islandsDisabled) {
      document.documentElement.classList.add('disable-effects');
      if (btnToggleIslands && islandsToggleKnob) {
        btnToggleIslands.classList.remove('bg-[#8b5cf6]');
        btnToggleIslands.classList.add('bg-white/10');
        islandsToggleKnob.classList.remove('translate-x-5');
        islandsToggleKnob.classList.add('translate-x-0');
      }
    } else {
      document.documentElement.classList.remove('disable-effects');
      if (btnToggleIslands && islandsToggleKnob) {
        btnToggleIslands.classList.remove('bg-white/10');
        btnToggleIslands.classList.add('bg-[#8b5cf6]');
        islandsToggleKnob.classList.remove('translate-x-0');
        islandsToggleKnob.classList.add('translate-x-5');
      }
    }
    if (window.initLenis) window.initLenis();
    else if (typeof initLenis === 'function') initLenis();
  }

  if (btnToggleIslands) {
    btnToggleIslands.addEventListener('click', () => {
      islandsDisabled = !islandsDisabled;
      localStorage.setItem('disable-islands', islandsDisabled);
      updateIslandsUI();
    });
  }

  // Bootstrap startup sequence
  loadSavedSettings();
  updateStarsProperties();
  updateIslandsProperties();
  updateStarsUI();
  updateIslandsUI();

  // --- CONSTELLATION BACKGROUND CANVAS ENGINE ---
  const canvas = document.getElementById('constellation-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width = 0;
    let height = 0;

    // Track mouse position
    const mouse = {
      x: null,
      y: null,
      targetX: null,
      targetY: null,
      active: false
    };

    // High-performance Spatial Uniform Grid pre-allocated buffers
    let gridHead = new Int32Array(0);
    let particleNext = new Int32Array(0);

    function ensureGridCapacity(numCells, numParticles) {
      if (gridHead.length < numCells) {
        const newSize = Math.max(gridHead.length * 2, numCells, 128);
        gridHead = new Int32Array(newSize);
      }
      if (particleNext.length < numParticles) {
        const newSize = Math.max(particleNext.length * 2, numParticles, 256);
        particleNext = new Int32Array(newSize);
      }
    }

    // Pre-allocated nearest neighbors buffer to completely eliminate GC overhead and allocations in loop
    const MAX_NEAREST = 64;
    const nearestParticleRefs = new Array(MAX_NEAREST);
    const nearestDistSqs = new Float32Array(MAX_NEAREST);
    const nearestDists = new Float32Array(MAX_NEAREST);

    // Resize handler
    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    }

    class Particle {
      constructor(x, y) {
        this.x = x !== undefined ? x : Math.random() * width;
        this.y = y !== undefined ? y : Math.random() * height;
        
        // Random organic directions
        const angle = Math.random() * Math.PI * 2;
        const speedMultiplier = 0.15 + Math.random() * 0.7;
        this.vx = Math.cos(angle) * speedMultiplier;
        this.vy = Math.sin(angle) * speedMultiplier;
        this.baseRadius = 1.0 + Math.random() * 1.3;
        this.radius = this.baseRadius;
        this.brightness = 0.10 + Math.random() * 0.35;
      }

      update() {
        // Standard continuous random moving direction
        this.x += this.vx * starConfig.speed;
        this.y += this.vy * starConfig.speed;

        // Wrap-around margins
        if (this.x < -20) this.x = width + 20;
        else if (this.x > width + 20) this.x = -20;
        
        if (this.y < -20) this.y = height + 20;
        else if (this.y > height + 20) this.y = -20;
      }

      draw(isLightMode) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (isLightMode) {
          ctx.fillStyle = `rgba(15, 23, 42, ${this.brightness * 0.55})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        }
        ctx.fill();
      }
    }

    function initParticles() {
      const targetCount = starConfig.density;
      if (particles.length === 0) {
        for (let i = 0; i < targetCount; i++) {
          particles.push(new Particle());
        }
      } else {
        // Dynamically add or remove particles for real-time slider sliding
        while (particles.length < targetCount) {
          particles.push(new Particle());
        }
        while (particles.length > targetCount) {
          particles.pop();
        }
      }
    }

    // Set callback to sync with tuning slider updates
    initParticlesFn = initParticles;

    // Track mouse coordinates over the window instantly with high-precision pointermove
    window.addEventListener('pointermove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    });

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Check current theme - light mode does not need this constellation effect
      const isLightMode = document.documentElement.classList.contains('light-mode');
      if (isLightMode) {
        requestAnimationFrame(animate);
        return;
      }
      
      // Update and draw faint background particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.radius = p.baseRadius; // Reset to standard state
        p.draw(isLightMode);
      }

      // Constellation network rendering
      if (mouse.active && mouse.x !== null) {
        const radiusSq = starConfig.radius * starConfig.radius;
        const starSize = Math.min(starConfig.size, MAX_NEAREST);
        const starRadius = starConfig.radius;

        // Build Spatial Uniform Grid dynamically
        const cellSize = Math.max(50, starRadius);
        const cols = Math.ceil(width / cellSize);
        const rows = Math.ceil(height / cellSize);
        const numCells = cols * rows;

        ensureGridCapacity(numCells, particles.length);

        // Reset grid pointers
        gridHead.fill(-1, 0, numCells);

        // Populate spatial grid
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const cx = Math.floor(p.x / cellSize);
          const cy = Math.floor(p.y / cellSize);
          
          const clampedCx = cx < 0 ? 0 : (cx >= cols ? cols - 1 : cx);
          const clampedCy = cy < 0 ? 0 : (cy >= rows ? rows - 1 : cy);
          
          const cellIndex = clampedCy * cols + clampedCx;
          particleNext[i] = gridHead[cellIndex];
          gridHead[cellIndex] = i;
        }

        // Search neighboring cells of the mouse (3x3 area)
        const mx = Math.floor(mouse.x / cellSize);
        const my = Math.floor(mouse.y / cellSize);

        const startX = Math.max(0, mx - 1);
        const endX = Math.min(cols - 1, mx + 1);
        const startY = Math.max(0, my - 1);
        const endY = Math.min(rows - 1, my + 1);

        let nearestCount = 0;

        for (let cy = startY; cy <= endY; cy++) {
          for (let cx = startX; cx <= endX; cx++) {
            const cellIndex = cy * cols + cx;
            let pIdx = gridHead[cellIndex];
            while (pIdx !== -1) {
              const p = particles[pIdx];
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const distSq = dx * dx + dy * dy;

              if (distSq < radiusSq) {
                // Keep the top K sorted nearest points directly (O(K))
                let insertIdx = nearestCount;
                while (insertIdx > 0 && nearestDistSqs[insertIdx - 1] > distSq) {
                  insertIdx--;
                }
                if (insertIdx < starSize) {
                  const shiftLimit = Math.min(nearestCount, starSize - 1);
                  for (let j = shiftLimit; j > insertIdx; j--) {
                    nearestDistSqs[j] = nearestDistSqs[j - 1];
                    nearestParticleRefs[j] = nearestParticleRefs[j - 1];
                  }
                  nearestDistSqs[insertIdx] = distSq;
                  nearestParticleRefs[insertIdx] = p;
                  if (nearestCount < starSize) {
                    nearestCount++;
                  }
                }
              }
              pIdx = particleNext[pIdx];
            }
          }
        }

        // Use cached, high-performance pre-parsed RGB values
        const r = starConfig.r;
        const g = starConfig.g;
        const b = starConfig.b;

        // If we found candidates for the constellation, process and render them
        if (nearestCount > 0) {
          // Lazy-evaluate Math.sqrt only for selected points
          for (let i = 0; i < nearestCount; i++) {
            nearestDists[i] = Math.sqrt(nearestDistSqs[i]);
          }

          for (let index = 0; index < nearestCount; index++) {
            const p = nearestParticleRefs[index];
            const dist = nearestDists[index];

            // Brighten and expand active constellation stars
            p.radius = p.baseRadius * 2.5;

            // Subtle halo around constellation points
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.12)`;
            ctx.fill();

            // Active star core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
            ctx.fill();

            // Link from mouse to active star
            const alpha = 1 - (dist / starRadius);
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.65})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Intercluster node-to-node line connections
            for (let otherIdx = index + 1; otherIdx < nearestCount; otherIdx++) {
              const otherP = nearestParticleRefs[otherIdx];
              const otherDist = nearestDists[otherIdx];

              const ndx = otherP.x - p.x;
              const ndy = otherP.y - p.y;
              const ndistSq = ndx * ndx + ndy * ndy;
              const thresholdSq = radiusSq * 0.64; // threshold = (radius * 0.8)^2

              if (ndistSq < thresholdSq) {
                const ndist = Math.sqrt(ndistSq);
                const otherAlpha = 1 - (otherDist / starRadius);
                const lineAlpha = alpha * otherAlpha * (1 - (ndist / (starRadius * 0.8)));

                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(otherP.x, otherP.y);
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha * 0.45})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }
          }
        }
      }

      requestAnimationFrame(animate);
    }

    // Set up canvas sizing
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
  }
});

// Image Stack Interaction
document.addEventListener('DOMContentLoaded', () => {
  const stack = document.getElementById('brunei-image-stack');
  if (!stack) return;

  const items = Array.from(stack.querySelectorAll('.stack-item'));
  let currentIndex = 0;
  // Store initial classes for reset
  const initialClasses = items.map(item => item.className);

  stack.addEventListener('click', () => {
    const currentItem = items[currentIndex];
    currentItem.classList.add('flipping');

    currentIndex = (currentIndex + 1) % items.length;

    if (currentIndex === 0) {
        // Reset everything
        setTimeout(() => {
            items.forEach((item, index) => {
                item.className = initialClasses[index];
            });
        }, 600);
    } else {
        // Hide current, make next clear
        setTimeout(() => {
            currentItem.classList.add('hidden');
            
            // Remove is-front from the item that just finished being front
            currentItem.classList.remove('is-front');

            const nextItem = items[currentIndex];
            // Remove faint/offset classes and make front clear
            nextItem.classList.add('is-front');
        }, 600);
    }
  });
});

