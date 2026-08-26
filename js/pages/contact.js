const ContactPage = {
    render() {
        const whatsappLink = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;
        const phoneLink = `tel:${CONFIG.PHONE_NUMBER}`;
        const tiktokLink = `https://www.tiktok.com/@${CONFIG.TIKTOK_USERNAME}`;

        return `
            <div class="contact-container">
                <div class="contact-card">
                    <!-- Profile Header -->
                    <div class="profile-header">
                        <div class="profile-avatar">S</div>
                        <h2 class="profile-name">${CONFIG.APP_NAME}</h2>
                        <p class="profile-tagline">Premium Women's Fashion & Couture</p>
                    </div>

                    <!-- About / Bio Section -->
                    <div class="info-section">
                        <h3 class="section-title">About Us</h3>
                        <p class="about-text">
                            Welcome to SAnA! We specialize in exclusive unstitched suits, ready-to-wear luxury kurtis, abayas, and elegant shawls. Designed with passion to bring high-end traditional and modern fashion right to your doorstep.
                        </p>
                    </div>

                    <!-- Contact Details & Action Buttons -->
                    <div class="contact-details">
                        <h3 class="section-title">Connect With Us</h3>
                        
                        <!-- WhatsApp Button -->
                        <a href="${whatsappLink}" target="_blank" class="contact-item whatsapp-btn">
                            <div class="item-icon">💬</div>
                            <div class="item-text">
                                <span class="item-label">WhatsApp</span>
                                <span class="item-value">Chat with Us</span>
                            </div>
                            <span class="action-arrow">→</span>
                        </a>

                        <!-- Call Button -->
                        <a href="${phoneLink}" class="contact-item phone-btn">
                            <div class="item-icon">📞</div>
                            <div class="item-text">
                                <span class="item-label">Phone Call</span>
                                <span class="item-value">Call Customer Support</span>
                            </div>
                            <span class="action-arrow">→</span>
                        </a>

                        <!-- TikTok Button -->
                        <a href="${tiktokLink}" target="_blank" class="contact-item tiktok-btn">
                            <div class="item-icon">🎵</div>
                            <div class="item-text">
                                <span class="item-label">TikTok</span>
                                <span class="item-value">Follow on TikTok</span>
                            </div>
                            <span class="action-arrow">→</span>
                        </a>

                        <!-- Live Google Map Button -->
                        <a href="${CONFIG.MAPS_URL}" target="_blank" class="contact-item location-btn">
                            <div class="item-icon">🗺️</div>
                            <div class="item-text">
                                <span class="item-label">Location</span>
                                <span class="item-value">${CONFIG.LOCATION_NAME}</span>
                            </div>
                            <span class="action-arrow">📍</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
};
