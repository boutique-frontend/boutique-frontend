import { CONFIG } from '../../config.js';

export const HomePage = {
    async render() {
        try {
            const response = await fetch('./pages/home/home.html');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.text();
        } catch (error) {
            console.error("Error loading home page:", error);
            return `<div style="padding: 100px 20px; text-align: center; color: #ffffff;">
                <h2>Failed to load Home layout</h2>
                <p style="color: #8c9ba5; font-size: 0.85rem; margin-top: 8px;">Check page template path.</p>
            </div>`;
        }
    },

    init() {
        // Dynamic initializers for home page elements
    }
};

window.HomePage = HomePage;
