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
    },

    bindData() {
        const titleEl = document.getElementById('aboutTitle');

        if (titleEl) {
            titleEl.textContent = 'ABOUT US';
        }
    }
};

window.AboutPage = AboutPage;
