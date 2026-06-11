/**
 * ONE CLICK COACHING - Main JavaScript
 * Mobile-first utilities and interactions
 */

// ═══════════════════════════════════════════════
// MOBILE MENU TOGGLE
// ═══════════════════════════════════════════════

function toggleMenu(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const menu = document.getElementById('mobile-menu');
  const hamburger = document.querySelector('.hamburger-icon');
  const button = document.querySelector('[aria-controls="mobile-menu"]');

  if (!menu || !hamburger || !button) {
    console.error('Menu elements not found');
    return false;
  }

  const isOpen = menu.classList.contains('open');

  // Toggle classes
  menu.classList.toggle('open');
  hamburger.classList.toggle('open');

  // Update ARIA attribute
  button.setAttribute('aria-expanded', !isOpen);

  // Prevent body scroll when menu is open
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';

  return false;
}

// ═══════════════════════════════════════════════
// DEMO MODAL
// ═══════════════════════════════════════════════

function openDemoModal() {
  const modal = document.getElementById('demo-modal');
  const video = document.getElementById('demo-video');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (video) video.play();
  }
}

function closeDemoModal() {
  const modal = document.getElementById('demo-modal');
  const video = document.getElementById('demo-video');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (video) { video.pause(); video.currentTime = 0; }
  }
}

// ═══════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {

  // ── Mobile Menu Link Clicks ──
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    const links = mobileMenu.querySelectorAll('a');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        // If it's an internal link (not external), close menu after brief delay
        if (link.hostname === window.location.hostname) {
          setTimeout(() => {
            if (mobileMenu.classList.contains('open')) {
              toggleMenu();
            }
          }, 150);
        }
      });
    });

    // Close menu when clicking on overlay background
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        toggleMenu();
      }
    });
  }

  // ── ESC Key to Close Overlays ──
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Close mobile menu
      const menu = document.getElementById('mobile-menu');
      if (menu && menu.classList.contains('open')) {
        toggleMenu();
      }

      // Close demo modal
      const modal = document.getElementById('demo-modal');
      if (modal && modal.classList.contains('open')) {
        closeDemoModal();
      }
    }
  });

  // ── Demo Modal Click Outside ──
  const demoModal = document.getElementById('demo-modal');
  if (demoModal) {
    demoModal.addEventListener('click', function(e) {
      if (e.target === demoModal) {
        closeDemoModal();
      }
    });
  }

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 80; // Approximate nav height
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});

// ═══════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════

// Debounce function for resize/scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
