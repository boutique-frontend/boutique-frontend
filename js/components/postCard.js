import { CONFIG } from '../config.js';
import { Helpers } from '../utils/helpers.js';
import { ImageViewerComponent } from './imageViewer.js';

export const PostCardComponent = {
    render(item) {
        const imageSrc = item.image_url || item.image;
        const formattedPrice = typeof Helpers !== 'undefined' && Helpers.formatPrice 
            ? Helpers.formatPrice(item.price) 
            : `${CONFIG.CURRENCY_SYMBOL || 'Rs.'} ${item.price}`;
        const waLink = typeof Helpers !== 'undefined' && Helpers.createWhatsAppLink 
            ? Helpers.createWhatsAppLink(item.title, item.price, item.sizes) 
            : '#';

        return `
            <div class="post-card" id="card-${item.id}">
                <!-- Media Container (Prevents Extreme Zooming) -->
                <div class="post-media-wrapper" onclick="ImageViewerComponent.open('${imageSrc}')">
                    <img src="${imageSrc}" alt="${item.title || 'Product Image'}">
                </div>

                <!-- Gradient Overlay for Contrast -->
                <div class="post-overlay"></div>

                <!-- Product Details & Action Controls -->
                <div class="post-content">
                    <span class="post-category-tag">${item.category || 'Unstitched'}</span>
                    
                    ${item.title ? `<h2 class="post-description" style="font-weight:700;">${item.title}</h2>` : ''}
                    ${item.description ? `<p class="post-description">${item.description}</p>` : ''}
                    
                    <div class="post-meta-info">
                        ${item.sizes ? `<span class="post-size-badge">Sizes: ${item.sizes}</span>` : ''}
                        <span class="post-price-tag">${formattedPrice}</span>
                    </div>

                    <!-- Clean Horizontal Action Bar -->
                    <div class="post-actions-bar">
                        <a href="${waLink}" target="_blank" class="btn-whatsapp">
                            <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
                        </a>
                        <button class="btn-action-light" onclick="PostCardComponent.shareItem('${item.title || 'Product'}', ${item.id})">
                            <i class="fa-solid fa-link"></i> Share
                        </button>
                        <button class="btn-action-danger" onclick="PostCardComponent.deletePost(${item.id})">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
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

// Bind to window so inline HTML onclick handlers function properly
window.PostCardComponent = PostCardComponent;
                                         
