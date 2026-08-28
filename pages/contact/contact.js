import { CONFIG } from '../../config.js';

export const ContactPage = {
    async render() {
        try {
            const response = await fetch('./pages/contact/contact.html');

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const html = await response.text();

            // Wait until the router has inserted the returned HTML
            // before trying to bind CONFIG data.
            setTimeout(() => this.bindData(), 50);

            return html;

        } catch (error) {
            console.error('Error loading contact template:', error);

            return `
                <div class="contact-page-wrapper contact-error">
                    <p>Failed to load contact information.</p>
                </div>
            `;
        }
    },

    bindData() {
        /*
         * -----------------------------------------
         * CONFIG DATA
         * -----------------------------------------
         */

        const getConfig = (key, fallback = '') => {
            return CONFIG[key] !== undefined &&
                   CONFIG[key] !== null &&
                   CONFIG[key] !== ''
                ? CONFIG[key]
                : fallback;
        };

        /*
         * -----------------------------------------
         * ELEMENTS
         * -----------------------------------------
         */

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
        const mapDirectionsBtn = document.getElementById('mapDirectionsBtn');
        const mapFrame = document.getElementById('mapFrame');

        /*
         * -----------------------------------------
         * PROFILE
         * -----------------------------------------
         */

        if (avatar) {
            const profileImage = getConfig('PROFILE_IMAGE');

            if (profileImage) {
                avatar.src = profileImage;
            }
        }

        if (appTitle) {
            appTitle.textContent = getConfig(
                'APP_NAME',
                'SAnA Boutique'
            );
        }

        /*
         * -----------------------------------------
         * EMAIL
         * -----------------------------------------
         */

        const email = getConfig('EMAIL');

        if (emailLink) {
            emailLink.href = email
                ? `mailto:${email}`
                : '#';
        }

        if (emailVal) {
            emailVal.textContent = email || 'Email unavailable';
        }

        /*
         * -----------------------------------------
         * WHATSAPP
         * -----------------------------------------
         */

        const whatsappNumber = getConfig('WHATSAPP_NUMBER');

        if (whatsappNumber) {
            const cleanWhatsapp = String(whatsappNumber)
                .replace(/\D/g, '');

            if (whatsappLink) {
                whatsappLink.href = `https://wa.me/${cleanWhatsapp}`;
            }

            if (whatsappVal) {
                whatsappVal.textContent = `+${cleanWhatsapp}`;
            }
        } else {
            if (whatsappLink) {
                whatsappLink.href = '#';
            }

            if (whatsappVal) {
                whatsappVal.textContent = 'WhatsApp unavailable';
            }
        }

        /*
         * -----------------------------------------
         * PHONE
         * -----------------------------------------
         */

        const phone = getConfig('PHONE_NUMBER');

        if (phoneLink) {
            phoneLink.href = phone
                ? `tel:${String(phone).replace(/\s+/g, '')}`
                : '#';
        }

        if (phoneVal) {
            phoneVal.textContent = phone || 'Phone unavailable';
        }

        /*
         * -----------------------------------------
         * TIKTOK
         * -----------------------------------------
         */

        const tiktokUsername = getConfig('TIKTOK_USERNAME');

        if (tiktokUsername) {
            const cleanTikTok = String(tiktokUsername)
                .replace(/^@/, '');

            if (tiktokLink) {
                tiktokLink.href =
                    `https://www.tiktok.com/@${cleanTikTok}`;
            }

            if (tiktokVal) {
                tiktokVal.textContent = `@${cleanTikTok}`;
            }
        } else {
            if (tiktokLink) {
                tiktokLink.href = '#';
            }

            if (tiktokVal) {
                tiktokVal.textContent = 'TikTok unavailable';
            }
        }

        /*
         * -----------------------------------------
         * INSTAGRAM
         * -----------------------------------------
         *
         * IMPORTANT:
         * The old code incorrectly used
         * CONFIG.TIKTOK_USERNAME here.
         *
         * This now correctly uses
         * CONFIG.INSTAGRAM_USERNAME.
         */

        const instagramUsername = getConfig('INSTAGRAM_USERNAME');

        if (instagramUsername) {
            const cleanInstagram = String(instagramUsername)
                .replace(/^@/, '');

            if (instagramLink) {
                instagramLink.href =
                    `https://www.instagram.com/${cleanInstagram}`;

                instagramLink.target = '_blank';
                instagramLink.rel = 'noopener noreferrer';
            }

            if (instagramVal) {
                instagramVal.textContent = `@${cleanInstagram}`;
            }
        } else {
            if (instagramLink) {
                instagramLink.href = '#';
            }

            if (instagramVal) {
                instagramVal.textContent = 'Instagram unavailable';
            }
        }

        /*
         * -----------------------------------------
         * LOCATION
         * -----------------------------------------
         */

        if (locationVal) {
            locationVal.textContent = getConfig(
                'LOCATION_NAME',
                'Location unavailable'
            );
        }

        /*
         * -----------------------------------------
         * GOOGLE MAP
         * -----------------------------------------
         */

        if (mapDirectionsBtn) {
            mapDirectionsBtn.href = getConfig(
                'MAPS_REDIRECT_URL',
                '#'
            );
        }

        if (mapFrame) {
            const mapUrl = getConfig('MAPS_EMBED_URL');

            if (mapUrl) {
                mapFrame.src = mapUrl;
            }
        }

        /*
         * -----------------------------------------
         * EXTERNAL LINKS
         * -----------------------------------------
         */

        document
            .querySelectorAll('.external-link')
            .forEach(link => {

                // Avoid attaching the same listener multiple times.
                if (link.dataset.contactBound === 'true') {
                    return;
                }

                link.dataset.contactBound = 'true';

                link.addEventListener('click', event => {
                    event.stopPropagation();
                });
            });
    }
};

window.ContactPage = ContactPage;
