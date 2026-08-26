const ContactPage = {
    render() {
        return `
            <div class="contact-container">
                <div class="contact-card">
                    <h2>Contact SAnA</h2>
                    <p>Connect with us directly to place orders or make inquiries.</p>
                    <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}" target="_blank" class="contact-link wa-bg">WhatsApp</a>
                    <a href="https://instagram.com" target="_blank" class="contact-link ig-bg">Instagram</a>
                </div>
            </div>
        `;
    }
};
