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
             * The HTML is returned first.
             * bindData() runs after the template has had time
             * to enter the DOM.
             */
            setTimeout(() => {
                this.bindData();
            }, 0);

            return html;

        } catch (error) {
            console.error("Error loading contact template:", error);

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
           CONFIG VALUES
           ===================================================== */

        const email = CONFIG.EMAIL || '';
        const phone = CONFIG.PHONE_NUMBER || '';
        const whatsapp = CONFIG.WHATSAPP_NUMBER || '';
        const tiktok = CONFIG.TIKTOK_USERNAME || '';
        const location = CONFIG.LOCATION_NAME || '';
        const mapsUrl = CONFIG.MAPS_REDIRECT_URL || '';
        const mapsEmbed = CONFIG.MAPS_EMBED_URL || '';
        const appName = CONFIG.APP_NAME || 'SAnA Boutique';

        /*
         * Instagram is supported if you add:
         *
         * INSTAGRAM_USERNAME: "sanaboutique.official"
         *
         * to config.js.
         *
         * Until then, the page will use the existing
         * Instagram username if available.
         */
        const instagram =
            CONFIG.INSTAGRAM_USERNAME ||
            CONFIG.INSTAGRAM_USERNAME ||
            '';

        /* =====================================================
           HELPERS
           ===================================================== */

        const cleanPhone = String(phone).replace(/[^\d+]/g, '');

        const cleanWhatsapp = String(whatsapp).replace(/\D/g, '');

        const cleanTikTok = String(tiktok)
            .replace(/^@/, '')
            .trim();

        const cleanInstagram = String(instagram)
            .replace(/^@/, '')
            .trim();

        /* =====================================================
           BRAND NAME
           ===================================================== */

        document.querySelectorAll('[data-config="APP_NAME"]').forEach(element => {
            element.textContent = appName;
        });

        const appTitle = document.getElementById('appNameTitle');

        if (appTitle) {
            appTitle.textContent = appName;
        }

        /* =====================================================
           EMAIL
           ===================================================== */

        const emailLinks = document.querySelectorAll(
            '#emailLink, [data-contact="email"]'
        );

        emailLinks.forEach(link => {
            if (!email) return;

            link.href = `mailto:${email}`;

            link.setAttribute('aria-label', `Email ${email}`);
            link.classList.add('external-link');
        });

        document.querySelectorAll('#emailVal, [data-value="email"]').forEach(element => {
            element.textContent = email;
        });

        /* =====================================================
           PHONE
           ===================================================== */

        const phoneLinks = document.querySelectorAll(
            '#phoneLink, [data-contact="phone"]'
        );

        phoneLinks.forEach(link => {
            if (!cleanPhone) return;

            link.href = `tel:${cleanPhone}`;

            link.setAttribute('aria-label', `Call ${phone}`);
            link.classList.add('external-link');
        });

        document.querySelectorAll('#phoneVal, [data-value="phone"]').forEach(element => {
            element.textContent = phone;
        });

        /* =====================================================
           WHATSAPP
           ===================================================== */

        const whatsappLinks = document.querySelectorAll(
            '#whatsappLink, [data-contact="whatsapp"]'
        );

        whatsappLinks.forEach(link => {
            if (!cleanWhatsapp) return;

            link.href = `https://wa.me/${cleanWhatsapp}`;

            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            link.setAttribute(
                'aria-label',
                `Contact ${appName} on WhatsApp`
            );

            link.classList.add('external-link');
        });

        document.querySelectorAll(
            '#whatsappVal, [data-value="whatsapp"]'
        ).forEach(element => {
            element.textContent = `+${cleanWhatsapp}`;
        });

        /* =====================================================
           TIKTOK
           ===================================================== */

        const tiktokLinks = document.querySelectorAll(
            '#tiktokLink, [data-contact="tiktok"]'
        );

        tiktokLinks.forEach(link => {
            if (!cleanTikTok) return;

            link.href = `https://www.tiktok.com/@${cleanTikTok}`;

            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            link.setAttribute(
                'aria-label',
                `Visit ${appName} on TikTok`
            );

            link.classList.add('external-link');
        });

        document.querySelectorAll(
            '#tiktokVal, [data-value="tiktok"]'
        ).forEach(element => {
            element.textContent = `@${cleanTikTok}`;
        });

        /* =====================================================
           INSTAGRAM
           ===================================================== */

        const instagramLinks = document.querySelectorAll(
            '#instagramLink, [data-contact="instagram"]'
        );

        instagramLinks.forEach(link => {

            if (!cleanInstagram) {
                link.removeAttribute('href');
                return;
            }

            link.href = `https://www.instagram.com/${cleanInstagram}`;

            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            link.setAttribute(
                'aria-label',
                `Visit ${appName} on Instagram`
            );

            link.classList.add('external-link');
        });

        document.querySelectorAll(
            '#instagramVal, [data-value="instagram"]'
        ).forEach(element => {

            element.textContent = cleanInstagram
                ? `@${cleanInstagram}`
                : 'Instagram';
        });

        /* =====================================================
           LOCATION
           ===================================================== */

        document.querySelectorAll(
            '#locationVal, [data-value="location"]'
        ).forEach(element => {
            element.textContent = location;
        });

        const locationLinks = document.querySelectorAll(
            '#locationLink, [data-contact="location"]'
        );

        locationLinks.forEach(link => {
            if (!mapsUrl) return;

            link.href = mapsUrl;

            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            link.setAttribute(
                'aria-label',
                `Open ${location} in Google Maps`
            );

            link.classList.add('external-link');
        });

        /* =====================================================
           GOOGLE MAP — LIVE EMBED
           ===================================================== */

        const mapFrames = document.querySelectorAll(
            '#mapFrame, #locationMapFrame, [data-map="embed"]'
        );

        mapFrames.forEach(frame => {

            if (!mapsEmbed) return;

            frame.src = mapsEmbed;

            frame.setAttribute('loading', 'lazy');
            frame.setAttribute('allowfullscreen', '');
            frame.setAttribute(
                'referrerpolicy',
                'no-referrer-when-downgrade'
            );
        });

        /* =====================================================
           GOOGLE MAP DIRECTIONS
           ===================================================== */

        const directionButtons = document.querySelectorAll(
            '#mapDirectionsBtn, #directionsBtn, [data-contact="directions"]'
        );

        directionButtons.forEach(button => {

            if (!mapsUrl) return;

            button.href = mapsUrl;

            button.target = '_blank';
            button.rel = 'noopener noreferrer';

            button.classList.add('external-link');
        });

        /* =====================================================
           SUPPORT / SEND MESSAGE
           ===================================================== */

        const messageLinks = document.querySelectorAll(
            '#sendMessageBtn, [data-contact="message"]'
        );

        messageLinks.forEach(link => {

            if (!email) return;

            link.href = `mailto:${email}`;

            link.classList.add('external-link');
        });

        /* =====================================================
           PREVENT INTERNAL HASH ROUTER FROM
           INTERCEPTING EXTERNAL CONTACT LINKS
           ===================================================== */

        document.querySelectorAll('.external-link').forEach(link => {

            if (link.dataset.contactBound === 'true') {
                return;
            }

            link.dataset.contactBound = 'true';

            link.addEventListener('click', event => {
                event.stopPropagation();
            });
        });

        /* =====================================================
           LOG CONFIG CONNECTION
           ===================================================== */

        console.log('SAnA Contact Page connected to CONFIG:', {
            email,
            phone,
            whatsapp,
            tiktok,
            location,
            mapsUrl,
            mapsEmbed
        });
    }
};

window.ContactPage = ContactPage;
