import { CONFIG } from '../../config.js';

/* -----------------------------------------------------------
   SANA BOUTIQUE — About Page module
   Contract expected by app.js's router:
     AboutPage.render() -> Promise<string> | string  (HTML to inject
       into #page-content)
     AboutPage.init()   -> wires up behavior once that HTML is live
       in the DOM. Called every time the #about route is entered.
   No backend calls. CONFIG is only used for display copy.
----------------------------------------------------------- */

// Tracks teardown for the previously-mounted instance, since the
// router can re-enter this route multiple times per session and
// nothing else calls an "unmount" hook for us.
let teardownPrevious = null;

export const AboutPage = {
    async render() {
        return `
        <div class="about-page">

          <header class="about-header">
            <button class="about-icon-btn" id="aboutBackBtn" type="button" aria-label="Go back">
              <i class="fa-solid fa-arrow-left"></i>
            </button>

            <a class="about-brand" href="#home">
              <span class="about-brand-name">SANA</span>
              <span class="about-brand-sub">About&nbsp;Us</span>
            </a>

            <button class="about-icon-btn" id="aboutWishBtn" type="button" aria-pressed="false" aria-label="Wishlist">
              <i class="fa-regular fa-heart" id="aboutWishIcon"></i>
            </button>
          </header>

          <section class="about-hero" id="aboutHero">
            <canvas class="about-hero-particles" id="aboutParticleCanvas" aria-hidden="true"></canvas>

            <svg class="about-hero-fabric" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <linearGradient id="aboutFabricA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#f6d98a" stop-opacity="0.55"/>
                  <stop offset="45%" stop-color="#c9962f" stop-opacity="0.28"/>
                  <stop offset="100%" stop-color="#3a2a10" stop-opacity="0"/>
                </linearGradient>
                <linearGradient id="aboutFabricB" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffe9b0" stop-opacity="0.4"/>
                  <stop offset="50%" stop-color="#a67c22" stop-opacity="0.18"/>
                  <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path class="about-strand about-strand-1" d="M 1180 -80 C 820 120, 760 340, 900 520 C 1040 700, 860 820, 620 980" fill="none" stroke="url(#aboutFabricA)" stroke-width="46" stroke-linecap="round"/>
              <path class="about-strand about-strand-2" d="M 1240 20 C 900 200, 900 420, 1040 560 C 1180 700, 980 860, 760 1040" fill="none" stroke="url(#aboutFabricB)" stroke-width="30" stroke-linecap="round"/>
              <path class="about-strand about-strand-3" d="M 1120 -120 C 760 60, 700 300, 860 460 C 1020 620, 820 760, 560 900" fill="none" stroke="url(#aboutFabricA)" stroke-width="14" stroke-linecap="round"/>
            </svg>

            <div class="about-hero-inner" data-reveal>
              <p class="about-eyebrow">Our Story</p>
              <h1 class="about-hero-title">Elegance<br><span class="about-gold-text">Redefined</span></h1>
              <div class="about-rule"></div>
              <p class="about-hero-copy">SANA Boutique is more than a brand — it's a celebration of timeless style, quality, and the beauty of tradition woven into modern fashion.</p>

              <div class="about-cta-row">
                <a class="about-btn about-btn-gold" href="#about" data-scroll="aboutStory">
                  <span>Discover Our Journey</span>
                </a>
                <a class="about-btn about-btn-ghost" href="#shop">
                  <span>Explore Collection</span>
                </a>
              </div>
            </div>

            <button class="about-scroll-cue" id="aboutScrollCue" type="button" aria-label="Scroll to explore">
              <i class="fa-solid fa-chevron-down"></i>
              <span>Scroll to Explore</span>
            </button>
          </section>

          <section class="about-section" id="aboutStory">
            <div class="about-mission-grid">

              <figure class="about-mission-visual" data-reveal>
                <div class="about-mission-frame">
                  <svg viewBox="0 0 400 400" class="about-fabric-close" aria-hidden="true">
                    <defs>
                      <radialGradient id="aboutSilkGlow" cx="35%" cy="30%" r="75%">
                        <stop offset="0%" stop-color="#5b4322"/>
                        <stop offset="55%" stop-color="#231a0d"/>
                        <stop offset="100%" stop-color="#0b0906"/>
                      </radialGradient>
                      <linearGradient id="aboutThreadLine" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#f2d98d"/>
                        <stop offset="100%" stop-color="#a97e2c"/>
                      </linearGradient>
                    </defs>
                    <rect width="400" height="400" fill="url(#aboutSilkGlow)"/>
                    <g class="about-thread-group" stroke="url(#aboutThreadLine)" fill="none" stroke-width="1.4" opacity="0.85">
                      <path d="M20 300 C120 260 160 340 260 300 S 380 260 400 300"/>
                      <path d="M0 240 C100 210 150 270 240 230 S 360 190 400 220"/>
                      <path d="M20 360 C130 330 190 380 300 350 S 380 330 400 350"/>
                    </g>
                    <g class="about-petal-group" fill="none" stroke="#f7e3ab" stroke-width="1.2" opacity="0.9">
                      <path d="M120 150 q14 -22 28 0 q-14 22 -28 0 Z"/>
                      <path d="M170 190 q12 -20 24 0 q-12 20 -24 0 Z"/>
                      <path d="M90 210 q10 -18 20 0 q-10 18 -20 0 Z"/>
                      <circle cx="134" cy="150" r="3" fill="#f7e3ab"/>
                      <circle cx="182" cy="190" r="2.5" fill="#f7e3ab"/>
                      <circle cx="100" cy="210" r="2.5" fill="#f7e3ab"/>
                    </g>
                  </svg>
                  <button class="about-play-btn" id="aboutPlayToggle1" type="button" aria-pressed="true" aria-label="Pause fabric motion">
                    <i class="fa-solid fa-pause" id="aboutPlayIcon1"></i>
                  </button>
                </div>
                <div class="about-dots" aria-hidden="true"><span class="about-dot is-active"></span><span class="about-dot"></span><span class="about-dot"></span></div>
              </figure>

              <div class="about-mission-copy" data-reveal>
                <p class="about-eyebrow">Our Mission</p>
                <h2 class="about-section-title">Crafting Beauty,<br><span class="about-gold-text">Inspiring Confidence</span></h2>
                <div class="about-rule"></div>
                <p class="about-section-text">We bring you carefully curated pieces that blend comfort with elegance. Every stitch, every fabric, and every detail is chosen with love.</p>

                <ul class="about-feature-chips">
                  <li><span class="about-chip-icon"><i class="fa-solid fa-leaf"></i></span><span>Thoughtful Design</span></li>
                  <li><span class="about-chip-icon"><i class="fa-solid fa-heart"></i></span><span>Premium Quality</span></li>
                  <li><span class="about-chip-icon"><i class="fa-solid fa-star"></i></span><span>Made For You</span></li>
                </ul>
              </div>
            </div>
          </section>

          <section class="about-section about-section--values" id="aboutValues">
            <div class="about-section-head center" data-reveal>
              <p class="about-eyebrow">Our Values</p>
              <h2 class="about-section-title">What We Stand For</h2>
              <div class="about-rule center"></div>
            </div>

            <div class="about-values-wrap" data-reveal>
              <button class="about-carousel-arrow left" id="aboutValuesPrev" type="button" aria-label="Previous value">
                <i class="fa-solid fa-chevron-left"></i>
              </button>

              <ul class="about-values-track" id="aboutValuesTrack">
                <li class="about-value-card">
                  <span class="about-value-icon"><i class="fa-solid fa-gem"></i></span>
                  <h3>Quality</h3>
                  <p>Premium fabrics and finest craftsmanship in every piece.</p>
                </li>
                <li class="about-value-card">
                  <span class="about-value-icon"><i class="fa-solid fa-heart"></i></span>
                  <h3>Passion</h3>
                  <p>We love what we do and it reflects in our designs.</p>
                </li>
                <li class="about-value-card">
                  <span class="about-value-icon"><i class="fa-solid fa-leaf"></i></span>
                  <h3>Tradition</h3>
                  <p>Rooted in tradition, designed for the modern you.</p>
                </li>
                <li class="about-value-card">
                  <span class="about-value-icon"><i class="fa-solid fa-star"></i></span>
                  <h3>Trust</h3>
                  <p>Our customers are our family. Your trust is our strength.</p>
                </li>
              </ul>

              <button class="about-carousel-arrow right" id="aboutValuesNext" type="button" aria-label="Next value">
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <div class="about-dots" id="aboutValuesDots" aria-hidden="true">
              <span class="about-dot is-active"></span><span class="about-dot"></span><span class="about-dot"></span><span class="about-dot"></span>
            </div>
          </section>

          <section class="about-section about-section--light" id="aboutMakers">
            <div class="about-mission-grid reverse">
              <div class="about-mission-copy" data-reveal>
                <p class="about-eyebrow about-eyebrow--dark">Behind the Brand</p>
                <h2 class="about-section-title dark">Made With <span class="about-gold-text">Heart</span></h2>
                <div class="about-rule"></div>
                <p class="about-section-text dark">From concept to creation, every collection is designed with heart and attention to detail. We believe fashion should make you feel beautiful, confident, and you.</p>
                <a class="about-btn about-btn-dark" href="#about" data-scroll="aboutValues">
                  <span>Meet the Makers</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>

              <figure class="about-mission-visual" data-reveal>
                <div class="about-mission-frame frame--light">
                  <svg viewBox="0 0 400 300" class="about-atelier-scene" aria-hidden="true">
                    <defs>
                      <linearGradient id="aboutAtelierBg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#3a2b16"/>
                        <stop offset="100%" stop-color="#161009"/>
                      </linearGradient>
                    </defs>
                    <rect width="400" height="300" fill="url(#aboutAtelierBg)"/>
                    <g class="about-needle-group" stroke="#f0d28e" stroke-width="2" fill="none" stroke-linecap="round">
                      <line x1="200" y1="30" x2="200" y2="110"/>
                      <path d="M180 110 h40 v18 h-40 Z" fill="#161009"/>
                    </g>
                    <g class="about-stitch-line" stroke="#f7e3ab" stroke-width="1.4" fill="none" stroke-dasharray="6 8">
                      <path d="M40 220 C 140 190 260 250 360 200"/>
                    </g>
                  </svg>
                  <button class="about-play-btn" id="aboutPlayToggle2" type="button" aria-pressed="true" aria-label="Pause atelier motion">
                    <i class="fa-solid fa-pause" id="aboutPlayIcon2"></i>
                  </button>
                </div>
              </figure>
            </div>
          </section>

          <section class="about-section about-cta-final" data-reveal>
            <p class="about-eyebrow">Join Us</p>
            <h2 class="about-section-title">Ready to Wear<br><span class="about-gold-text">Your Story?</span></h2>
            <p class="about-section-text">Step into a world where every piece is chosen with intention — for you.</p>
            <p class="about-visit-line"><i class="fa-solid fa-location-dot"></i> Visit our atelier — ${CONFIG.LOCATION_NAME}</p>
            <div class="about-cta-row center">
              <a class="about-btn about-btn-gold" href="#shop"><span>Shop the Collection</span></a>
              <a class="about-btn about-btn-ghost" href="#contact"><span>Contact Us</span></a>
            </div>
          </section>

        </div>
        `;
    },

    init() {
        if (teardownPrevious) {
            teardownPrevious();
            teardownPrevious = null;
        }

        const root = document.querySelector('.about-page');
        if (!root) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const listeners = []; // [target, event, handler, opts]
        const observers = []; // objects with .disconnect()
        let particleStop = null;

        function on(target, event, handler, opts) {
            target.addEventListener(event, handler, opts);
            listeners.push([target, event, handler, opts]);
        }

        /* ---------- Header: back + wishlist ---------- */
        const backBtn = root.querySelector('#aboutBackBtn');
        if (backBtn) {
            on(backBtn, 'click', () => {
                if (window.history.length > 1) window.history.back();
                else window.location.hash = '#home';
            });
        }

        const wishBtn = root.querySelector('#aboutWishBtn');
        const wishIcon = root.querySelector('#aboutWishIcon');
        if (wishBtn && wishIcon) {
            on(wishBtn, 'click', () => {
                const active = wishBtn.getAttribute('aria-pressed') === 'true';
                wishBtn.setAttribute('aria-pressed', String(!active));
                wishIcon.classList.toggle('fa-regular', active);
                wishIcon.classList.toggle('fa-solid', !active);
                wishBtn.classList.toggle('is-liked', !active);
            });
        }

        /* ---------- In-page smooth scroll ---------- */
        root.querySelectorAll('[data-scroll]').forEach((link) => {
            on(link, 'click', (e) => {
                const targetId = link.getAttribute('data-scroll');
                const target = targetId && document.getElementById(targetId);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
            });
        });

        const scrollCue = root.querySelector('#aboutScrollCue');
        if (scrollCue) {
            on(scrollCue, 'click', () => {
                const story = document.getElementById('aboutStory');
                if (story) story.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
            });
        }

        /* ---------- Scroll-reveal ---------- */
        const revealEls = root.querySelectorAll('[data-reveal]');
        if ('IntersectionObserver' in window && revealEls.length) {
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry, i) => {
                        if (entry.isIntersecting) {
                            entry.target.style.transitionDelay = reduceMotion ? '0ms' : `${(i % 4) * 90}ms`;
                            entry.target.classList.add('is-visible');
                            io.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
            );
            revealEls.forEach((el) => io.observe(el));
            observers.push(io);
        } else {
            revealEls.forEach((el) => el.classList.add('is-visible'));
        }

        /* ---------- Button ripple ---------- */
        root.querySelectorAll('.about-btn').forEach((btn) => {
            on(btn, 'click', (e) => {
                if (reduceMotion) return;
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 1.2;
                const ripple = document.createElement('span');
                ripple.className = 'about-ripple';
                ripple.style.width = ripple.style.height = `${size}px`;
                const x = (e.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
                const y = (e.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                btn.appendChild(ripple);
                window.setTimeout(() => ripple.remove(), 700);
            });
        });

        /* ---------- Play / pause ambient scenes ---------- */
        function wirePlayToggle(btnId, iconId) {
            const btn = root.querySelector(`#${btnId}`);
            const icon = root.querySelector(`#${iconId}`);
            if (!btn || !icon) return;
            const frame = btn.closest('.about-mission-frame');
            on(btn, 'click', () => {
                const playing = btn.getAttribute('aria-pressed') === 'true';
                const next = !playing;
                btn.setAttribute('aria-pressed', String(next));
                if (frame) frame.classList.toggle('is-paused', !next);
                icon.classList.toggle('fa-pause', next);
                icon.classList.toggle('fa-play', !next);
                btn.setAttribute('aria-label', next ? 'Pause motion' : 'Play motion');
            });
        }
        wirePlayToggle('aboutPlayToggle1', 'aboutPlayIcon1');
        wirePlayToggle('aboutPlayToggle2', 'aboutPlayIcon2');

        /* ---------- Values carousel ---------- */
        (function initValuesCarousel() {
            const track = root.querySelector('#aboutValuesTrack');
            const prev = root.querySelector('#aboutValuesPrev');
            const next = root.querySelector('#aboutValuesNext');
            const dotsWrap = root.querySelector('#aboutValuesDots');
            if (!track) return;

            const cards = Array.from(track.children);
            const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

            function cardStep() {
                const card = cards[0];
                if (!card) return 0;
                const style = window.getComputedStyle(track);
                const gap = parseFloat(style.columnGap || style.gap || '14');
                return card.getBoundingClientRect().width + gap;
            }
            function scrollByCards(dir) {
                track.scrollBy({ left: dir * cardStep(), behavior: reduceMotion ? 'auto' : 'smooth' });
            }
            if (prev) on(prev, 'click', () => scrollByCards(-1));
            if (next) on(next, 'click', () => scrollByCards(1));

            if (dots.length && 'IntersectionObserver' in window) {
                const dotObserver = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            const idx = cards.indexOf(entry.target);
                            if (idx === -1) return;
                            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                                dots.forEach((d) => d.classList.remove('is-active'));
                                if (dots[idx]) dots[idx].classList.add('is-active');
                            }
                        });
                    },
                    { root: track, threshold: [0.6] }
                );
                cards.forEach((c) => dotObserver.observe(c));
                observers.push(dotObserver);
            }
        })();

        /* ---------- Hero particle canvas ---------- */
        (function initParticles() {
            const canvas = root.querySelector('#aboutParticleCanvas');
            const hero = root.querySelector('#aboutHero');
            if (!canvas || !hero) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            let particles = [];
            let raf = null;
            let running = false;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            let w = 0, h = 0, t = 0;

            function rand(min, max) { return Math.random() * (max - min) + min; }

            function seed() {
                const count = Math.max(24, Math.min(Math.round((w * h) / 16000), 70));
                particles = [];
                for (let i = 0; i < count; i++) {
                    particles.push({
                        x: rand(0, w), y: rand(0, h),
                        r: rand(0.6, 2.2),
                        vx: rand(-0.06, 0.09), vy: rand(-0.14, -0.02),
                        baseAlpha: rand(0.25, 0.85),
                        twinkleSpeed: rand(0.6, 1.6),
                        twinklePhase: rand(0, Math.PI * 2)
                    });
                }
            }

            function resize() {
                const rect = hero.getBoundingClientRect();
                w = rect.width; h = rect.height;
                canvas.width = Math.floor(w * dpr);
                canvas.height = Math.floor(h * dpr);
                canvas.style.width = `${w}px`;
                canvas.style.height = `${h}px`;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                seed();
            }

            function draw() {
                // Self-stopping safety net: if this node was ever left
                // mounted after a route change, stop touching it.
                if (!canvas.isConnected) { stop(); return; }
                t += 0.016;
                ctx.clearRect(0, 0, w, h);
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    p.x += p.vx; p.y += p.vy;
                    if (p.y < -6) { p.y = h + 6; p.x = rand(0, w); }
                    if (p.x < -6) p.x = w + 6;
                    if (p.x > w + 6) p.x = -6;

                    const twinkle = 0.5 + 0.5 * Math.sin(t * p.twinkleSpeed + p.twinklePhase);
                    const alpha = p.baseAlpha * (0.4 + 0.6 * twinkle);

                    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
                    glow.addColorStop(0, `rgba(246,226,171,${alpha})`);
                    glow.addColorStop(1, 'rgba(246,226,171,0)');
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = `rgba(255,244,214,${Math.min(1, alpha + 0.15)})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                }
                raf = window.requestAnimationFrame(draw);
            }

            function start() {
                if (running || reduceMotion) return;
                running = true;
                raf = window.requestAnimationFrame(draw);
            }
            function stop() {
                running = false;
                if (raf) window.cancelAnimationFrame(raf);
                raf = null;
            }

            resize();
            if (!reduceMotion) start(); else draw(); // single static frame

            let resizeTimer;
            const onResize = () => {
                window.clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(resize, 150);
            };
            on(window, 'resize', onResize);

            const onVisibility = () => {
                if (document.hidden) stop(); else if (!reduceMotion) start();
            };
            on(document, 'visibilitychange', onVisibility);

            if ('IntersectionObserver' in window) {
                const heroObserver = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting && !document.hidden) start();
                            else stop();
                        });
                    },
                    { threshold: 0.05 }
                );
                heroObserver.observe(hero);
                observers.push(heroObserver);
            }

            particleStop = stop;
        })();

        /* ---------- Teardown, called on next init() or route change ---------- */
        teardownPrevious = () => {
            listeners.forEach(([target, event, handler, opts]) => target.removeEventListener(event, handler, opts));
            observers.forEach((o) => o.disconnect());
            if (particleStop) particleStop();
        };
    }
};
