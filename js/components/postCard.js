const PostCardComponent = {
    render(item) {
        const imageSrc = item.image_url || item.image;
        const formattedPrice = typeof Helpers !== 'undefined' && Helpers.formatPrice 
            ? Helpers.formatPrice(item.price) 
            : `${CONFIG.CURRENCY_SYMBOL} ${item.price}`;
        const waLink = typeof Helpers !== 'undefined' && Helpers.createWhatsAppLink 
            ? Helpers.createWhatsAppLink(item.title, item.price, item.sizes) 
            : '#';

        return `
            <div class="product-card">
                <img src="${imageSrc}" alt="${item.title}" onclick="ImageViewerComponent.open('${imageSrc}')">
                
                <div class="product-overlay">
                    <span class="category-tag">${item.category || 'Collection'}</span>
                    <h2 class="product-title">${item.title}</h2>
                    ${item.description ? `<p class="product-description">${item.description}</p>` : ''}
                    ${item.sizes ? `<span class="product-sizes">Sizes: ${item.sizes}</span>` : ''}
                    <div class="product-price">${formattedPrice}</div>
                    
                    <a href="${waLink}" target="_blank" class="whatsapp-btn">
                        Order on WhatsApp
                    </a>
                </div>
            </div>
        `;
    }
};
                                                                         
