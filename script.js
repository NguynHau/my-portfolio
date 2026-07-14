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
});
