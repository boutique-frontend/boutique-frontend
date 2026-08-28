import { CONFIG } from '../../config.js';

export const AboutPage = {
    async render() {
        try {
            const response = await fetch('./pages/about/about.html', {
                cache: 'no-cache'
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to load About page (${response.status})`
                );
            }

            return await response.text();
        } catch (error) {
            console.error('Error loading About page template:', error);

            return `
                <section class="about-page about-error-page">
                    <div class="about-error-card">
                        <h2>Unable to Load About</h2>
                        <p>
                            We couldn't load the About section right now.
                            Please try again.
                        </p>
                    </div>
                </section>
            `;
        }
    },

    init() {
        this.bindData();
        this.bindInteractions();
    },

    bindData() {
        const titleEl = document.getElementById('aboutTitle');

        if (titleEl && CONFIG.APP_NAME) {
            titleEl.textContent = 'ABOUT US';
        }
    },

    bindInteractions() {
        const aboutPage = document.querySelector('.about-page');

        if (!aboutPage) {
            return;
        }

        if (aboutPage.dataset.initialized === 'true') {
            return;
        }

        aboutPage.dataset.initialized = 'true';

        aboutPage.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#about-"]');

            if (!link) {
                return;
            }

            const targetId = link.getAttribute('href');

            if (!targetId) {
                return;
            }

            const target = aboutPage.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
};

window.AboutPage = AboutPage;
