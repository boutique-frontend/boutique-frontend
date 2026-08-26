const Helpers = {
    formatPrice(amount) {
        return `${CONFIG.CURRENCY_SYMBOL} ${Number(amount).toLocaleString()}`;
    },

    createWhatsAppLink(title, price, sizes) {
        const msg = `Hi SAnA! I want to order "${title}" (${this.formatPrice(price)}) ${sizes ? `in Size: ${sizes}` : ''}. Is it available?`;
        return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }
};
