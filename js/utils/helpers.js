import { CONFIG } from '../config.js';

export const Helpers = {
    formatPrice(amount) {
        const num = Number(amount) || 0;
        const currency = (typeof CONFIG !== 'undefined' && CONFIG.CURRENCY_SYMBOL) 
            ? CONFIG.CURRENCY_SYMBOL 
            : 'Rs.';
        return `${currency} ${num.toLocaleString()}`;
    },

    createWhatsAppLink(title, price, sizes) {
        const formattedPrice = this.formatPrice(price);
        const rawPhone = (typeof CONFIG !== 'undefined' && CONFIG.WHATSAPP_NUMBER) 
            ? CONFIG.WHATSAPP_NUMBER 
            : '923100559630';
        
        const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
        const msg = `Hi SAnA! I want to order "${title}" (${formattedPrice}) ${sizes ? `in Size: ${sizes}` : ''}. Is it available?`;
        
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    }
};

// Bind to window object for legacy global scripts and inline templates
window.Helpers = Helpers;
