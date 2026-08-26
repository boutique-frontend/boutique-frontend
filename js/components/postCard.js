const PostCardComponent = {
    render(item) {
        return `
            <div class="product-card">
                <img src="${item.image}" alt="${item.title}" onclick="ImageViewerComponent.open('${item.image}')">
                
                <div class="product-overlay">
                    <span class="category-tag">${item.category || 'Collection'}</span>
                    <h2 class="product-title">${item.title}</h2>
                    ${item.description ? `<p class="product-description">${item.description}</p>` : ''}
                    ${item.sizes ? `<span class="product-sizes">Sizes: ${item.sizes}</span>` : ''}
                    <div class="product-price">${Helpers.formatPrice(item.price)}</div>
                    
                    <a href="${Helpers.createWhatsAppLink(item.title, item.price, item.sizes)}" target="_blank" class="whatsapp-btn">
                        Order on WhatsApp
                    </a>
                </div>
            </div>
        `;
    }
};
