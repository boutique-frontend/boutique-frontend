import { CONFIG } from '../../config.js';

export const ContactPage = {
    async render() {
        try {
            const response = await fetch('./pages/contact/contact.html');

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const html = await response.text();

            /*
             * Bind configuration only after the HTML has been
             * inserted into the page.
             */
            setTimeout(() => {
                this.bindData();
                this.scrollToTop();
            }, 0);

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

    /* =========================================================
       ALWAYS START CONTACT PAGE AT THE TOP
       ========================================================= */

    scrollToTop() {
        /*
         * Scroll the Contact page itself.
         */
        const contactPage =
            document.querySelector('.contact-page-wrapper');

        if (contactPage) {
            contactPage.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            });
        }

        /*
         * Also reset the old scrollable contact body if present.
         */
        const contactBody =
            document.querySelector('.contact-body-scroll');

        if (contactBody) {
            contactBody.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            });
        }

        /*
         * Reset common application/page scroll containers.
         */
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
        });

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    },

    bindData() {
        /* =====================================================
           ELEMENTS
           ===================================================== */

        const avatar =
            document.getElementById('profileAvatarImg');

        const appTitle =
            document.getElementById('appNameTitle');

        const emailLink =
            document.getElementById('emailLink');

        const emailVal =
            document.getElementById('emailVal');

        const whatsappLink =
            document.getElementById('whatsappLink');

        const whatsappVal =
            document.getElementById('whatsappVal');

        const phoneLink =
            document.getElementById('phoneLink');

        const phoneVal =
            document.getElementById('phoneVal');

        const tiktokLink =
            document.getElementById('tiktokLink');

        const tiktokVal =
            document.getElementById('tiktokVal');

        const instagramLink =
            document.getElementById('instagramLink');

        const instagramVal =
            document.getElementById('instagramVal');

        const locationLink =
            document.getElementById('locationLink');

        const locationVal =
            document.getElementById('locationVal');

        const mapDirectionsBtn =
            document.getElementById('mapDirectionsBtn');

        const mapFrame =
            document.getElementById('mapFrame');

        /*
         * Chat With Us button.
         *
         * This ID will be added to the updated contact.html.
         */
        const chatWithUsLink =
            document.getElementById('chatWithUsLink');

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
           Uses CONFIG.EMAIL
           ===================================================== */

        if (emailLink && CONFIG.EMAIL) {
            emailLink.href =
                `mailto:${CONFIG.EMAIL}`;
        }

        if (emailVal) {
            emailVal.textContent =
                CONFIG.EMAIL || '';
        }

        /* =====================================================
           WHATSAPP
           Uses CONFIG.WHATSAPP_NUMBER
           ===================================================== */

        const cleanWhatsapp =
            String(CONFIG.WHATSAPP_NUMBER || '')
                .replace(/\D/g, '');

        if (whatsappLink && cleanWhatsapp) {
            whatsappLink.href =
                `https://wa.me/${cleanWhatsapp}`;
        }

        if (whatsappVal) {
            whatsappVal.textContent =
                cleanWhatsapp
                    ? `+${cleanWhatsapp}`
                    : '';
        }

        /* =====================================================
           CHAT WITH US
           
           Uses the SAME CONFIG.WHATSAPP_NUMBER.
           
           Nothing is hardcoded here.
           ===================================================== */

        if (chatWithUsLink && cleanWhatsapp) {
            chatWithUsLink.href =
                `https://wa.me/${cleanWhatsapp}`;

            chatWithUsLink.target = '_blank';
            chatWithUsLink.rel =
                'noopener noreferrer';
        }

        /* =====================================================
           PHONE
           Uses CONFIG.PHONE_NUMBER
           ===================================================== */

        const phoneNumber =
            String(CONFIG.PHONE_NUMBER || '');

        const cleanPhone =
            phoneNumber.replace(/[^\d+]/g, '');

        if (phoneLink && cleanPhone) {
            phoneLink.href =
                `tel:${cleanPhone}`;
        }

        if (phoneVal) {
            phoneVal.textContent =
                phoneNumber;
        }

        /* =====================================================
           TIKTOK
           Uses CONFIG.TIKTOK_USERNAME
           ===================================================== */

        if (tiktokLink && CONFIG.TIKTOK_USERNAME) {
            const username =
                String(CONFIG.TIKTOK_USERNAME)
                    .replace(/^@/, '')
                    .trim();

            if (username) {
                tiktokLink.href =
                    `https://www.tiktok.com/@${username}`;

                if (tiktokVal) {
                    tiktokVal.textContent =
                        `@${username}`;
                }
            }
        }

        /* =====================================================
           INSTAGRAM
           Uses CONFIG.INSTAGRAM_USERNAME
           ===================================================== */

        if (instagramLink) {
            const instagramUsername =
                CONFIG.INSTAGRAM_USERNAME ||
                CONFIG.INSTAGRAM ||
                '';

            const cleanInstagram =
                String(instagramUsername)
                    .replace(/^@/, '')
                    .trim();

            if (cleanInstagram) {
                instagramLink.href =
                    `https://www.instagram.com/${cleanInstagram}/`;

                if (instagramVal) {
                    instagramVal.textContent =
                        `@${cleanInstagram}`;
                }
            }
        }

        /* =====================================================
           LOCATION
           Uses CONFIG.LOCATION_NAME
           ===================================================== */

        if (locationVal) {
            locationVal.textContent =
                CONFIG.LOCATION_NAME || '';
        }

        if (locationLink &&
            CONFIG.MAPS_REDIRECT_URL) {

            locationLink.href =
                CONFIG.MAPS_REDIRECT_URL;
        }

        if (mapDirectionsBtn &&
            CONFIG.MAPS_REDIRECT_URL) {

            mapDirectionsBtn.href =
                CONFIG.MAPS_REDIRECT_URL;
        }

        /* =====================================================
           LIVE GOOGLE MAP
           Uses CONFIG.MAPS_EMBED_URL
           ===================================================== */

        if (mapFrame &&
            CONFIG.MAPS_EMBED_URL) {

            mapFrame.src =
                CONFIG.MAPS_EMBED_URL;
        }

        /* =====================================================
           EXTERNAL LINKS
           
           Prevent the application's hash router from treating
           external links as internal navigation.
           ===================================================== */

        document
            .querySelectorAll('.external-link')
            .forEach((link) => {

                /*
                 * Prevent duplicate listeners when Contact
                 * is opened more than once.
                 */
                if (link.dataset.routerProtected === 'true') {
                    return;
                }

                link.dataset.routerProtected = 'true';

                link.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            });

        /*
         * Final scroll reset after all data has been bound.
         */
        this.scrollToTop();
    }
};

window.ContactPage = ContactPage;
