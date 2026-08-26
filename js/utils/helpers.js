const Helpers = {
    createWhatsAppLink(title, price) {
        const message = `Hi! I want to order ${title} (${price})`;
        return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }
};
