import { CONFIG } from '../config.js';

export const ContactPage = {
    render() {
        return `
            <div class="contact-page">
                <!-- Glowing Profile Header -->
                <div class="contact-header">
                    <div class="profile-avatar-wrapper">
                        <img src="${CONFIG.PROFILE_IMAGE}" alt="${CONFIG.APP_NAME}" class="profile-avatar-img" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=SAnA+Boutique&background=ffd700&color=000000&size=128';">
                    </div>
                    <h2 class="profile-title">${CONFIG.APP_NAME}</h2>
                    <p class="profile-subtitle">Premium Women's Fashion & Couture</p>
                    <p class="profile-bio">
                        Welcome to SAnA! We specialize in exclusive unstitched suits, ready-to-wear luxury kurtis, abayas, and elegant shawls.
                    </p>
                </div>

                <!-- Action Cards List -->
                <div class="cards-list">
                    
                    <!-- Email Card -->
                    <a href="mailto:${CONFIG.EMAIL}" class="link-card">
                        <div class="badge-icon badge-email">
                            <span>✉️</span>
                        </div>
                        <div class="card-details">
                            <span class="card-title">Email</span>
                            <span class="card-value">${CONFIG.EMAIL}</span>
                        </div>
                        <span class="chevron-arrow">›</span>
                    </a>

                    <!-- WhatsApp Card -->
                    <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}" target="_blank" class="link-card">
                        <div class="badge-icon badge-whatsapp">
                            <span>💬</span>
                        </div>
                        <div class="card-details">
                            <span class="card-title">WhatsApp</span>
                            <span class="card-value">Message ${CONFIG.APP_NAME}</span>
                        </div>
                        <span class="chevron-arrow">›</span>
                    </a>

                    <!-- TikTok Card -->
                    <a href="https://www.tiktok.com/@${CONFIG.TIKTOK_USERNAME}" target="_blank" class="link-card">
                        <div class="badge-icon badge-tiktok">
                            <span>🎵</span>
                        </div>
                        <div class="card-details">
                            <span class="card-title">TikTok</span>
                            <span class="card-value">@${CONFIG.TIKTOK_USERNAME}</span>
                        </div>
                        <span class="chevron-arrow">›</span>
                    </a>

                    <!-- Phone Card -->
                    <a href="tel:${CONFIG.PHONE_NUMBER}" class="link-card">
                        <div class="badge-icon badge-phone">
                            <span>📞</span>
                        </div>
                        <div class="card-details">
                            <span class="card-title">Contact Number</span>
                            <span class="card-value">${CONFIG.PHONE_NUMBER}</span>
                        </div>
                        <span class="chevron-arrow">›</span>
                    </a>

                    <!-- Live Google Map Card -->
                    <div class="map-card-wrapper">
                        <div class="map-header">
                            <span class="card-title">Our Location</span>
                            <span class="card-value">${CONFIG.LOCATION_NAME}</span>
                        </div>
                        <div class="map-container" onclick="window.open('${CONFIG.MAPS_REDIRECT_URL}', '_blank')">
                            <iframe src="${CONFIG.MAPS_EMBED_URL}" width="100%" height="160" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                            <div class="map-overlay">
                                <span>Tap to open Google Maps 📍</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }
};
