import { CONFIG } from '../../config.js';

export const ContactPage = {
    async render() {
        // Delay binding until after the HTML is injected into the DOM
        setTimeout(() => this.bindData(), 0);

        try {
            const response = await fetch('./pages/contact/contact.html');
            return await response.text();
        } catch (error) {
            console.error("Error loading contact template:", error);
            // Updated fallback to match the new dark theme wrapper
            return `
                <div class="contact-page-wrapper" style="justify-content: center; align-items: center;">
                    <p style="color:#f87171; font-family: 'Plus Jakarta Sans', sans-serif;">Failed to load contact information.</p>
                </div>
            `;
        }
    },

    bindData() {
        const avatar = document.getElementById('profileAvatarImg');
        const appTitle = document.getElementById('appNameTitle');
        const emailLink = document.getElementById('emailLink');
        const emailVal = document.getElementById('emailVal');
        const whatsappLink = document.getElementById('whatsappLink');
        const whatsappVal = document.getElementById('whatsappVal');
        const tiktokLink = document.getElementById('tiktokLink');
        const tiktokVal = document.getElementById('tiktokVal');
        const phoneLink = document.getElementById('phoneLink');
        const phoneVal = document.getElementById('phoneVal');
        const locationVal = document.getElementById('locationVal');
        const mapContainer = document.getElementById('mapContainer');
        const mapFrame = document.getElementById('mapFrame');

        if (avatar) avatar.src = CONFIG.PROFILE_IMAGE;
        if (appTitle) appTitle.textContent = CONFIG.APP_NAME;

        if (emailLink && emailVal) {
            emailLink.href = `mailto:${CONFIG.EMAIL}`;
            emailVal.textContent = CONFIG.EMAIL;
        }

        if (whatsappLink && whatsappVal) {
            whatsappLink.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;
            whatsappVal.textContent = `Message Us`; 
        }

        if (tiktokLink && tiktokVal) {
            tiktokLink.href = `https://www.tiktok.com/@${CONFIG.TIKTOK_USERNAME}`;
            tiktokVal.textContent = `@${CONFIG.TIKTOK_USERNAME}`;
        }

        if (phoneLink && phoneVal) {
            phoneLink.href = `tel:${CONFIG.PHONE_NUMBER}`;
            phoneVal.textContent = CONFIG.PHONE_NUMBER;
        }

        if (locationVal) locationVal.textContent = CONFIG.LOCATION_NAME;

        if (mapContainer) {
            mapContainer.onclick = () => window.open(CONFIG.MAPS_REDIRECT_URL, '_blank');
        }

        if (mapFrame) {
            mapFrame.src = CONFIG.MAPS_EMBED_URL;
        }
    }
};

window.ContactPage = ContactPage;
    
