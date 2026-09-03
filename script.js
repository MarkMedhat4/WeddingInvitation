/* ============================================================
   MARCO & NADEEN — WEDDING INVITATION
   script.js
   ============================================================ */

(function () {
  'use strict';

  const WEDDING_DATE = new Date('2026-10-11T19:00:00');
  const WHATSAPP_NUMBER = '201551553557';
  const WHATSAPP_MESSAGE =
    'Hello Marco & Nadeen,\n\n' +
    'Congratulations! \u2764\uFE0F\n\n' +
    'I am delighted to accept your wedding invitation, and I look forward to celebrating this beautiful day with you.\n\n' +
    'See you on October 11, 2026.';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ---------- OPENING INVITATION ---------- */
  function initInvitation() {
    const html = document.documentElement;
    const tapButton = document.getElementById('tapToOpen');

    html.classList.add('no-scroll');
    document.body.classList.add('no-scroll');

    if (tapButton) {
      tapButton.addEventListener('click', openInvitation);
    }
  }

  function openInvitation() {
    const openingScreen = document.getElementById('opening-screen');
    const invitation = document.getElementById('invitation');
    if (!openingScreen || !invitation) return;

    invitation.classList.add('is-opening');

    const revealDelay = prefersReducedMotion ? 150 : 1250;

    window.setTimeout(function () {
      openingScreen.classList.add('is-open');
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');

      window.setTimeout(function () {
        openingScreen.classList.add('is-hidden');
      }, prefersReducedMotion ? 260 : 1000);
    }, revealDelay);
  }

  /* ---------- COUNTDOWN ---------- */
  let countdownTimer = null;

  function startCountdown() {
    updateCountdown();
    countdownTimer = window.setInterval(updateCountdown, 1000);
  }

  function updateCountdown() {
    const grid = document.getElementById('countdownGrid');
    const message = document.getElementById('countdownMessage');
    const now = new Date();
    const diff = WEDDING_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      if (countdownTimer) window.clearInterval(countdownTimer);
      if (grid) grid.hidden = true;
      if (message) message.hidden = false;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setText('cdDays', days);
    setText('cdHours', hours);
    setText('cdMinutes', minutes);
    setText('cdSeconds', seconds);
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2, '0');
  }

  /* ---------- SCROLL REVEALS ---------- */
  function initScrollReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- MUSIC PLAYER ---------- */
  function initMusicPlayer() {
    const audio = document.getElementById('bgMusic');
    const control = document.getElementById('musicControl');
    const label = document.getElementById('musicLabel');
    if (!audio || !control) return;

    // If the music file isn't present, hide the control gracefully.
    audio.addEventListener('error', function () {
      control.hidden = true;
    });

    control.addEventListener('click', function () {
      if (audio.paused) {
        audio
          .play()
          .then(function () {
            control.classList.add('is-playing');
            control.setAttribute('aria-pressed', 'true');
            if (label) label.textContent = 'Pause Music';
          })
          .catch(function () {
            /* Autoplay-style restrictions or missing file: hide the control. */
            control.hidden = true;
          });
      } else {
        audio.pause();
        control.classList.remove('is-playing');
        control.setAttribute('aria-pressed', 'false');
        if (label) label.textContent = 'Play Music';
      }
    });
  }

  /* ---------- ACCEPT INVITATION (WHATSAPP) ---------- */
  function initAcceptInvitation() {
    const button = document.getElementById('acceptInvitation');
    if (!button) return;
    button.addEventListener('click', acceptInvitation);
  }

  function acceptInvitation() {
    const encoded = encodeURIComponent(WHATSAPP_MESSAGE);
    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encoded;
    window.open(url, '_blank', 'noopener');
  }

  /* ---------- NAVIGATION ---------- */
  function initNavigation() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initInvitation();
    startCountdown();
    initScrollReveal();
    initMusicPlayer();
    initAcceptInvitation();
    initNavigation();
  });
})();
