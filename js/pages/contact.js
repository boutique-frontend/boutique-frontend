const ContactPage = {
    render() {
        return `
            <div class="contact-container">
                <div class="contact-card">
                    <!-- Profile Header -->
                    <div class="profile-header">
                        <div class="profile-avatar">S</div>
                        <h2 class="profile-name">SAnA Boutique</h2>
                        <p class="profile-tagline">Premium Women's Fashion & Couture</p>
                    </div>

                    <!-- About / Bio Section -->
                    <div class="info-section">
                        <h3 class="section-title">About Us</h3>
                        <p class="about-text">
                            Welcome to SAnA! We specialize in exclusive unstitched suits, ready-to-wear luxury kurtis, abayas, and elegant shawls. Designed with passion to bring high-end traditional and modern fashion right to your doorstep.
                        </p>
                    </div>

                    <!-- Contact Details List -->
                    <div class="contact-details">
                        <h3 class="section-title">Get in Touch</h3>
                        
                        <a href="https://wa.me/923001234567" target="_blank" class="contact-item whatsapp-item">
                            <div class="item-icon">💬</div>
                            <div class="item-text">
                                <span class="item-label">WhatsApp</span>
                                <span class="item-value">+92 300 1234567</span>
                            </div>
                        </a>

                        <a href="tel:+923001234567" class="contact-item">
                            <div class="item-icon">📞</div>
                            <div class="item-text">
                                <span class="item-label">Phone Number</span>
                                <span class="item-value">+92 300 1234567</span>
                            </div>
                        </a>

                        <div class="contact-item">
                            <div class="item-icon">📍</div>
                            <div class="item-text">
                                <span class="item-label">Location</span>
                                <span class="item-value">Main Market, Lahore, Pakistan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
