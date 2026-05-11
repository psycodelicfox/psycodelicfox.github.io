/* ============================================
   Fox Fulbright - Portfolio JS
   Starfield, email reveal, year stamp
   ============================================ */

(function () {
  'use strict';

  // ----- Email obfuscation -----
  // Real email assembled at runtime so basic scrapers don't grab it
  function setupEmail() {
    const link = document.getElementById('email-link');
    if (!link) return;

    const user = link.dataset.user;
    const domain = link.dataset.domain;
    const email = user + '@' + domain;

    const display = link.querySelector('.email-display');

    let revealed = false;
    link.addEventListener('click', function (e) {
      if (!revealed) {
        e.preventDefault();
        link.href = 'mailto:' + email;
        display.textContent = email;
        revealed = true;
      }
      // second click follows the mailto
    });

    // also reveal on hover for non-touch devices
    link.addEventListener('mouseenter', function () {
      if (!revealed) {
        link.href = 'mailto:' + email;
        display.textContent = email;
        revealed = true;
      }
    });
  }

  // ----- Year stamp -----
  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ----- Starfield -----
  // Subtle parallax dots, hand-built, no library
  function setupStarfield() {
    const canvas = document.getElementById('stars');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    let w, h, dpr;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      makeStars();
    }

    function makeStars() {
      const density = Math.floor((window.innerWidth * window.innerHeight) / 9000);
      stars = [];
      for (let i = 0; i < density; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.3 * dpr + 0.3 * dpr,
          // twinkle params
          base: Math.random() * 0.5 + 0.2,
          amp: Math.random() * 0.4 + 0.1,
          speed: Math.random() * 0.002 + 0.0005,
          phase: Math.random() * Math.PI * 2,
          // gentle drift
          dx: (Math.random() - 0.5) * 0.05,
          dy: (Math.random() - 0.5) * 0.05
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const alpha = s.base + Math.sin(t * s.speed + s.phase) * s.amp;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        // warm star color, varying slightly
        if (i % 17 === 0) {
          ctx.fillStyle = 'rgba(232, 168, 92,' + Math.max(0, alpha) + ')';
        } else if (i % 23 === 0) {
          ctx.fillStyle = 'rgba(107, 168, 169,' + Math.max(0, alpha) + ')';
        } else {
          ctx.fillStyle = 'rgba(243, 236, 224,' + Math.max(0, alpha * 0.8) + ')';
        }
        ctx.fill();

        s.x += s.dx;
        s.y += s.dy;

        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;
      }
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);

    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // draw once, no animation
      stars.forEach(function (s, i) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 17 === 0
          ? 'rgba(232, 168, 92, 0.5)'
          : 'rgba(243, 236, 224, 0.4)';
        ctx.fill();
      });
      return;
    }

    requestAnimationFrame(draw);
  }

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupEmail();
    setYear();
    setupStarfield();
  }
})();
