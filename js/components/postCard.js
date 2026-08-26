const PostCardComponent = {
    render(item) {
        return `
            <div class="product-card">
                <img src="${item.image}" alt="${item.title}">
                <div class="product-details">
                    <h3 class="product-title">${item.title}</h3>
                    <p class="product-price">$${item.price}</p>
                    <a href="${Helpers.createWhatsAppLink(item.title, item.price)}" target="_blank" class="whatsapp-btn">
                        Order on WhatsApp
                    </a>
                </div>
            </div>
        `;
    }
};
