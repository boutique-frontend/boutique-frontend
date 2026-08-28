import { CONFIG } from '../../config.js';

export const ContactPage = {
    async render() {
        try {
            const response = await fetch('./pages/contact/contact.html');

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const html = await response.text();

            // Bind configuration after the HTML has been inserted into the page
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

        const locationLink = document.getElementById('locationLink');
        const locationVal = document.getElementById('locationVal');

        const mapDirectionsBtn = document.getElementById('mapDirectionsBtn');
        const mapFrame = document.getElementById('mapFrame');

        /* =====================================================
           APP / PROFILE
           ===================================================== */

        if (avatar && CONFIG.PROFILE_IMAGE) {
            avatar.src = CONFIG.PROFILE_IMAGE;
        }

        if (appTitle) {
            appTitle.textContent = CONFIG.APP_NAME || 'SAnA Boutique';
        }

        /* =====================================================
           EMAIL
           Uses CONFIG.EMAIL
           ===================================================== */

        if (emailLink && CONFIG.EMAIL) {
            emailLink.href = `mailto:${CONFIG.EMAIL}`;
        }

        if (emailVal) {
            emailVal.textContent = CONFIG.EMAIL || '';
        }

        /* =====================================================
           WHATSAPP
           Uses CONFIG.WHATSAPP_NUMBER
           ===================================================== */

        if (whatsappLink && CONFIG.WHATSAPP_NUMBER) {
            const cleanWhatsapp = String(CONFIG.WHATSAPP_NUMBER).replace(/\D/g, '');

            whatsappLink.href = `https://wa.me/${cleanWhatsapp}`;
        }

        if (whatsappVal) {
            const cleanWhatsapp = String(
                CONFIG.WHATSAPP_NUMBER || ''
            ).replace(/\D/g, '');

            whatsappVal.textContent = cleanWhatsapp
                ? `+${cleanWhatsapp}`
                : '';
        }

        /* =====================================================
           PHONE
           Uses CONFIG.PHONE_NUMBER
           ===================================================== */

        if (phoneLink && CONFIG.PHONE_NUMBER) {
            const cleanPhone = String(CONFIG.PHONE_NUMBER)
                .replace(/[^\d+]/g, '');

            phoneLink.href = `tel:${cleanPhone}`;
        }

        if (phoneVal) {
            phoneVal.textContent = CONFIG.PHONE_NUMBER || '';
        }

        /* =====================================================
           TIKTOK
           Uses CONFIG.TIKTOK_USERNAME
           ===================================================== */

        if (tiktokLink && CONFIG.TIKTOK_USERNAME) {
            const username = String(CONFIG.TIKTOK_USERNAME)
                .replace(/^@/, '')
                .trim();

            tiktokLink.href = `https://www.tiktok.com/@${username}`;

            if (tiktokVal) {
                tiktokVal.textContent = `@${username}`;
            }
        }

        /* =====================================================
           INSTAGRAM
           
           If CONFIG.INSTAGRAM_USERNAME exists, use it.
           Otherwise use the existing Instagram value if added
           to CONFIG later.
           ===================================================== */

        if (instagramLink) {
            const instagramUsername =
                CONFIG.INSTAGRAM_USERNAME ||
                CONFIG.INSTAGRAM ||
                '';

            const cleanInstagram = String(instagramUsername)
                .replace(/^@/, '')
                .trim();

            if (cleanInstagram) {
                instagramLink.href =
                    `https://www.instagram.com/${cleanInstagram}/`;

                if (instagramVal) {
                    instagramVal.textContent = `@${cleanInstagram}`;
                }
            }
        }

        /* =====================================================
           LOCATION
           Uses CONFIG.LOCATION_NAME
           Uses CONFIG.MAPS_REDIRECT_URL when tapped
           ===================================================== */

        if (locationVal) {
            locationVal.textContent =
                CONFIG.LOCATION_NAME || '';
        }

        if (locationLink && CONFIG.MAPS_REDIRECT_URL) {
            locationLink.href = CONFIG.MAPS_REDIRECT_URL;
        }

        if (mapDirectionsBtn && CONFIG.MAPS_REDIRECT_URL) {
            mapDirectionsBtn.href = CONFIG.MAPS_REDIRECT_URL;
        }

        /* =====================================================
           LIVE GOOGLE MAP
           Uses CONFIG.MAPS_EMBED_URL
           ===================================================== */

        if (mapFrame && CONFIG.MAPS_EMBED_URL) {
            mapFrame.src = CONFIG.MAPS_EMBED_URL;
        }

        /* =====================================================
           EXTERNAL LINKS
           
           Prevent the application's hash router from treating
           external links as internal navigation.
           ===================================================== */

        document
            .querySelectorAll('.external-link')
            .forEach((link) => {
                link.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            });
    }
};

window.ContactPage = ContactPage;
