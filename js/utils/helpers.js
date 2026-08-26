const Helpers = {
    formatPrice(amount) {
        const num = Number(amount) || 0;
        const currency = (typeof CONFIG !== 'undefined' && CONFIG.CURRENCY_SYMBOL) ? CONFIG.CURRENCY_SYMBOL : 'Rs.';
        return `${currency} ${num.toLocaleString()}`;
    },

    createWhatsAppLink(title, price, sizes) {
        const formattedPrice = this.formatPrice(price);
        const cleanPhone = (typeof CONFIG !== 'undefined' && CONFIG.WHATSAPP_NUMBER) 
            ? CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '') 
            : '';
        const msg = `Hi SAnA! I want to order "${title}" (${formattedPrice}) ${sizes ? `in Size: ${sizes}` : ''}. Is it available?`;
        
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    }
};
