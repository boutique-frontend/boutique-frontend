import { CONFIG } from '../../config.js';

export const HomePage = {
    async render() {
        try {
            const response = await fetch('./pages/home/home.html');
            if (!response.ok) throw new Error('Failed to load home template');
            return await response.text();
        } catch (error) {
            console.error("Home render error:", error);
            return `<div style="padding: 20px; color: white;">Error loading home page content.</div>`;
        }
    },

    init() {
        // Initialize dynamic home elements here
    }
};

window.HomePage = HomePage;
