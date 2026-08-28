import { CONFIG } from '../../config.js';

export const ContactPage = {
    async render() {
        setTimeout(() => this.bindData(), 0);

        try {
            const response = await fetch('./pages/contact/contact.html');
            return await response.text();
        } catch (error) {
            console.error("Error loading contact template:", error);
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
        const instagramLink = document.getElementById('instagramLink');
        const instagramVal = document.getElementById('instagramVal');
        const phoneLink = document.getElementById('phoneLink');
        const phoneVal = document.getElementById('phoneVal');
        const locationVal = document.getElementById('locationVal');
        const mapDirectionsBtn = document.getElementById('mapDirectionsBtn');
        const mapFrame = document.getElementById('mapFrame');

        if (avatar) avatar.src = CONFIG.PROFILE_IMAGE;
        if (appTitle) appTitle.textContent = CONFIG.APP_NAME;

        if (emailLink && emailVal) {
            emailLink.href = `mailto:${CONFIG.EMAIL}`;
            emailVal.textContent = CONFIG.EMAIL;
        }

        if (whatsappLink && whatsappVal) {
            const cleanWhatsapp = CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '');
            whatsappLink.href = `https://wa.me/${cleanWhatsapp}`;
            whatsappVal.textContent = `+${cleanWhatsapp}`;
        }

        if (phoneLink && phoneVal) {
            phoneLink.href = `tel:${CONFIG.PHONE_NUMBER.replace(/\s+/g, '')}`;
            phoneVal.textContent = CONFIG.PHONE_NUMBER;
        }

        if (tiktokLink && tiktokVal) {
            const cleanTikTok = CONFIG.TIKTOK_USERNAME.replace('@', '');
            tiktokLink.href = `https://www.tiktok.com/@${cleanTikTok}`;
            tiktokVal.textContent = `@${cleanTikTok}`;
        }

        if (instagramLink && instagramVal) {
            const cleanInsta = CONFIG.TIKTOK_USERNAME.replace('@', '');
            instagramLink.href = `https://www.instagram.com/${cleanInsta}`;
            instagramVal.textContent = `@${cleanInsta}`;
        }

        if (locationVal) locationVal.textContent = CONFIG.LOCATION_NAME;

        if (mapDirectionsBtn) {
            mapDirectionsBtn.href = CONFIG.MAPS_REDIRECT_URL;
        }

        if (mapFrame) {
            mapFrame.src = CONFIG.MAPS_EMBED_URL;
        }

        // Prevents the hash router from overriding external link clicks back to home
        document.querySelectorAll('.external-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }
};

window.ContactPage = ContactPage;
