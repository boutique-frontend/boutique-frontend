import { CONFIG } from '../../config.js';

export const HomePage = {
    cachedFeatured: null,

    async render() {
        setTimeout(() => this.loadFeaturedProducts(), 0);

        try {
            const response = await fetch('./pages/home/home.html');
            return await response.text();
        } catch (error) {
            console.error("Error loading home template:", error);
            return `<div class="home-page"><p style="color:#f87171; padding:20px;">Error loading home page.</p></div>`;
        }
    },

    async loadFeaturedProducts() {
        const container = document.getElementById('featured-products-container');
        if (!container) return;

        if (this.cachedFeatured) {
            container.innerHTML = this.renderFeaturedHtml(this.cachedFeatured);
            return;
        }

        try {
            const response = await fetch(CONFIG.API_URL);
            const posts = await response.json();
            this.cachedFeatured = posts.slice(0, 5);

            if (!this.cachedFeatured || this.cachedFeatured.length === 0) {
                container.innerHTML = `<p style="color: #888; padding: 10px; font-size: 0.8rem;">No featured items available.</p>`;
                return;
            }

            container.innerHTML = this.renderFeaturedHtml(this.cachedFeatured);
        } catch (error) {
            console.error("Error loading featured items:", error);
            container.innerHTML = `<p style="color: #e53e3e; padding: 10px; font-size: 0.8rem;">Unable to load featured products.</p>`;
        }
    },

    renderFeaturedHtml(items) {
        return items.map(item => `
            <div class="product-item-card" onclick="App.navigate('shop')">
                <div class="product-item-image">
                    <img src="${item.image_url || item.image || 'https://via.placeholder.com/300'}" alt="${item.title || 'Boutique Item'}">
                    <button class="wishlist-btn" onclick="event.stopPropagation();"><i class="fa-regular fa-heart"></i></button>
                </div>
                <div class="product-item-details">
                    <span class="product-item-name">${item.title || item.description || 'Luxury Dress'}</span>
                    <span class="product-item-price">Rs. ${item.price || 'N/A'}</span>
                </div>
            </div>
        `).join('');
    }
};

window.HomePage = HomePage;
                  
