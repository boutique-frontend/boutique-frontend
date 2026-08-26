const PostCardComponent = {
    render(item) {
        return `
            <div class="product-card">
                <img src="${item.image}" alt="${item.title}">
                <div class="product-details">
                    <span class="category-tag">${item.category || 'Collection'}</span>
                    <h3 class="product-title">${item.title}</h3>
                    ${item.description ? `<p class="product-description">${item.description}</p>` : ''}
                    ${item.sizes ? `<span class="product-sizes">Sizes: ${item.sizes}</span>` : ''}
                    <p class="product-price">${Helpers.formatPrice(item.price)}</p>
                    <a href="${Helpers.createWhatsAppLink(item.title, item.price, item.sizes)}" target="_blank" class="whatsapp-btn">
                        Order on WhatsApp
                    </a>
                </div>
            </div>
        `;
    }
};
