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
            <div class="product-card" id="card-${item.id}">
                <img src="${imageSrc}" alt="${item.title}" onclick="ImageViewerComponent.open('${imageSrc}')">
                
                <!-- Floating Action Button -->
                <button class="fab-menu-btn" onclick="PostCardComponent.toggleMenu(${item.id}, event)">
                    ⋮
                </button>

                <!-- Action Menu Popup -->
                <div class="card-action-menu" id="menu-${item.id}">
                    <a href="${waLink}" target="_blank" class="menu-item wa-item">
                        <span>💬 Order on WhatsApp</span>
                    </a>
                    <button class="menu-item share-item" onclick="PostCardComponent.shareItem('${item.title}', ${item.id})">
                        <span>🔗 Share Item</span>
                    </button>
                    <button class="menu-item delete-item" onclick="PostCardComponent.deletePost(${item.id})">
                        <span>🗑 Delete Post</span>
                    </button>
                </div>

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
    },

    toggleMenu(id, event) {
        event.stopPropagation();
        const activeMenu = document.getElementById(`menu-${id}`);
        document.querySelectorAll('.card-action-menu').forEach(menu => {
            if (menu !== activeMenu) menu.classList.remove('active');
        });
        if (activeMenu) {
            activeMenu.classList.toggle('active');
        }
    },

    shareItem(title, id) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `Check out "${title}" on SAnA Boutique!`,
                url: window.location.href
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
        document.querySelectorAll('.card-action-menu').forEach(m => m.classList.remove('active'));
    },

    async deletePost(id) {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const response = await fetch(`${CONFIG.API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                const card = document.getElementById(`card-${id}`);
                if (card) card.remove();
                alert("Post deleted successfully.");
            } else {
                alert("Failed to delete post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Network error: Could not delete post.");
        }
    }
};

// Close popup menu when tapping anywhere else on screen
document.addEventListener('click', () => {
    document.querySelectorAll('.card-action-menu').forEach(menu => menu.classList.remove('active'));
});
        
