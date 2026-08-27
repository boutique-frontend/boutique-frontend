import { CONFIG } from '../../config.js';

export const AboutPage = {
    async render() {
        setTimeout(() => this.bindData(), 0);

        try {
            const response = await fetch('./pages/about/about.html');
            return await response.text();
        } catch (error) {
            console.error("Error loading about page template:", error);
            return `<div class="about-page"><p style="color:#f87171;">Failed to load about section.</p></div>`;
        }
    },

    bindData() {
        const titleEl = document.getElementById('aboutTitle');
        if (titleEl && CONFIG.APP_NAME) {
            titleEl.textContent = `About ${CONFIG.APP_NAME}`;
        }
    }
};

window.AboutPage = AboutPage;
