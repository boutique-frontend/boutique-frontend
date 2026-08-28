import { CONFIG } from '../../config.js';

export const ContactPage = {

    async render() {
        try {
            const response = await fetch('./pages/contact/contact.html');

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const html = await response.text();

            // Wait until the returned HTML has been inserted into the DOM
            setTimeout(() => this.bindData(), 0);

            return html;

        } catch (error) {
            console.error('Error loading contact template:', error);

            return `
                <div class="contact-page-wrapper contact-error-page">
                    <div class="contact-error-card">
                        <h2>Unable to Load Contact Page</h2>
                        <p>Please try again later.</p>
                    </div>
                </div>
            `;
        }
    },

    bindData() {

        /* =====================================================
           ALWAYS START CONTACT PAGE FROM THE TOP
           ===================================================== */

        const contactPage = document.querySelector('.contact-page-wrapper');

        if (contactPage) {
            contactPage.scrollTop = 0;
        }

        window.scrollTo(0, 0);


        /* =====================================================
           ELEMENTS
           ===================================================== */

        const avatar = document.getElementById('profileAvatarImg');
        const appTitle = document.getElementById('appNameTitle');

        const emailLink = document.getElementById('emailLink');
        const emailVal = document.getElementById('emailVal');

        const whatsappLink = document.getElementById('whatsappLink');
        const whatsappVal = document.getElementById('whatsappVal');

        const phoneLink = document.getElementById('phoneLink');
        const phoneVal = document.getElementById('phoneVal');

        const tiktokLink = document.getElementById('tiktokLink');
        const tiktokVal = document.getElementById('tiktokVal');

        const instagramLink = document.getElementById('instagramLink');
        const instagramVal = document.getElementById('instagramVal');

        const locationVal = document.getElementById('locationVal');

        const mapDirectionsBtn =
            document.getElementById('mapDirectionsBtn');

        const mapFrame =
            document.getElementById('mapFrame');

        const helpWhatsAppButton =
            document.getElementById('helpWhatsAppButton');


        /* =====================================================
           APP / PROFILE
           ===================================================== */

        if (avatar && CONFIG.PROFILE_IMAGE) {
            avatar.src = CONFIG.PROFILE_IMAGE;
        }

        if (appTitle) {
            appTitle.textContent =
                CONFIG.APP_NAME || 'SAnA Boutique';
        }


        /* =====================================================
           EMAIL
           ===================================================== */

        if (emailLink && CONFIG.EMAIL) {
            emailLink.href = `mailto:${CONFIG.EMAIL}`;
        }

        if (emailVal) {
            emailVal.textContent =
                CONFIG.EMAIL || '';
        }


        /* =====================================================
           WHATSAPP
           EVERYTHING USES CONFIG.WHATSAPP_NUMBER
           ===================================================== */

        const cleanWhatsapp = String(
            CONFIG.WHATSAPP_NUMBER || ''
        ).replace(/\D/g, '');

        const whatsappUrl = cleanWhatsapp
            ? `https://wa.me/${cleanWhatsapp}`
            : '#';


        // WhatsApp contact card
        if (whatsappLink) {
            whatsappLink.href = whatsappUrl;
        }

        if (whatsappVal) {
            whatsappVal.textContent = cleanWhatsapp
                ? `+${cleanWhatsapp}`
                : '';
        }


        // "Chat With Us" button
        if (helpWhatsAppButton) {
            helpWhatsAppButton.href = whatsappUrl;
        }


        /* =====================================================
           PHONE
           USES CONFIG.PHONE_NUMBER
           ===================================================== */

        const cleanPhone = String(
            CONFIG.PHONE_NUMBER || ''
        ).replace(/[^\d+]/g, '');

        if (phoneLink) {
            phoneLink.href = cleanPhone
                ? `tel:${cleanPhone}`
                : '#';
        }

        if (phoneVal) {
            phoneVal.textContent =
                CONFIG.PHONE_NUMBER || '';
        }


        /* =====================================================
           TIKTOK
           USES CONFIG.TIKTOK_USERNAME
           ===================================================== */

        const tiktokUsername = String(
            CONFIG.TIKTOK_USERNAME || ''
        )
            .replace(/^@/, '')
            .trim();

        if (tiktokLink && tiktokUsername) {
            tiktokLink.href =
                `https://www.tiktok.com/@${tiktokUsername}`;
        }

        if (tiktokVal) {
            tiktokVal.textContent =
                tiktokUsername
                    ? `@${tiktokUsername}`
                    : '';
        }


        /* =====================================================
           INSTAGRAM
           USES CONFIG.INSTAGRAM_USERNAME
           ===================================================== */

        const instagramUsername = String(
            CONFIG.INSTAGRAM_USERNAME || ''
        )
            .replace(/^@/, '')
            .trim();

        if (instagramLink && instagramUsername) {
            instagramLink.href =
                `https://www.instagram.com/${instagramUsername}/`;
        }

        if (instagramVal) {
            instagramVal.textContent =
                instagramUsername
                    ? `@${instagramUsername}`
                    : '';
        }


        /* =====================================================
           LOCATION
           ===================================================== */

        if (locationVal) {
            locationVal.textContent =
                CONFIG.LOCATION_NAME || '';
        }


        /* =====================================================
           GOOGLE MAP DIRECTIONS
           ===================================================== */

        if (
            mapDirectionsBtn &&
            CONFIG.MAPS_REDIRECT_URL
        ) {
            mapDirectionsBtn.href =
                CONFIG.MAPS_REDIRECT_URL;
        }


        /* =====================================================
           LIVE GOOGLE MAP
           ===================================================== */

        if (
            mapFrame &&
            CONFIG.MAPS_EMBED_URL
        ) {
            mapFrame.src =
                CONFIG.MAPS_EMBED_URL;
        }


        /* =====================================================
           EXTERNAL LINKS
           PREVENT HASH ROUTER INTERFERENCE
           ===================================================== */

        document
            .querySelectorAll('.external-link')
            .forEach((link) => {

                // Avoid attaching the same listener multiple times
                if (link.dataset.externalBound === 'true') {
                    return;
                }

                link.dataset.externalBound = 'true';

                link.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            });
    }
};

window.ContactPage = ContactPage;
