import { CONFIG } from '../../config.js';

export const HomePage = {
    cachedFeatured: null,

    async render() {
        try {
            const response = await fetch('./pages/home/home.html');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.text();
        } catch (error) {
            console.error("Home render error:", error);
            return `<div style="padding: 80px 20px; text-align: center; color: #ffffff;">
                <h3>Error loading Home page</h3>
                <p style="color: #8c9ba5; font-size: 0.85rem; margin-top: 8px;">${error.message}</p>
            </div>`;
        }
    },

    async init() {
        this.bindEvents();
        await this.loadFeaturedProducts();
    },

    bindEvents() {
        // Navigation CTA Buttons
        const shopNowBtn = document.getElementById('heroShopNowBtn');
        if (shopNowBtn) {
            shopNowBtn.addEventListener('click', () => {
                window.location.hash = '#shop';
            });
        }

        const exploreBtn = document.getElementById('heroExploreBtn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                window.location.hash = '#shop';
            });
        }

        // Collection Card Clicks
        const collectionCards = document.querySelectorAll('.collection-card');
        collectionCards.forEach(card => {
            card.addEventListener('click', () => {
                const cat = card.getAttribute('data-cat');
                window.location.hash = `#shop?category=${cat || 'all'}`;
            });
        });
    },

    async loadFeaturedProducts(forceRefresh = false) {
        const featuredContainer = document.getElementById('featured-products-container');
        if (!featuredContainer) return;

        if (this.cachedFeatured && !forceRefresh) {
            this.renderFeaturedGrid(this.cachedFeatured);
            return;
        }

        try {
            const response = await fetch(CONFIG.API_URL);
            if (!response.ok) throw new Error("API request failed");
            
            const posts = await response.json();
            
            if (Array.isArray(posts) && posts.length > 0) {
                this.cachedFeatured = posts;
                this.renderFeaturedGrid(posts);
            } else {
                this.renderEmptyState(featuredContainer);
            }
        } catch (error) {
            console.error("Error fetching live featured products:", error);
            this.renderErrorState(featuredContainer);
        }
    },

    renderFeaturedGrid(posts) {
        const featuredContainer = document.getElementById('featured-products-container');
        if (!featuredContainer) return;

        // Take up to 6 latest items for Featured section
        const featuredItems = posts.slice(0, 6);

        featuredContainer.innerHTML = featuredItems.map(item => {
            const imgSrc = item.image_url || item.image || './assets/placeholder.jpg';
            const title = item.title || item.name || 'Boutique Outfit';
            const rawPrice = item.price ? item.price.toString() : '2,850';
            const price = rawPrice.includes('Rs') ? rawPrice : `Rs. ${rawPrice}`;

            return `
                <div class="featured-card">
                    <div class="featured-card-image">
                        <img src="${imgSrc}" alt="${title}" loading="lazy">
                        <button class="wishlist-btn" aria-label="Wishlist">&#9825;</button>
                    </div>
                    <div class="featured-card-info">
                        <span class="featured-card-title">${title}</span>
                        <span class="featured-card-price">${price}</span>
                    </div>
                </div>
            `;
        }).join('');

        this.bindWishlistBtns();
    },

    bindWishlistBtns() {
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                btn.classList.toggle('active');
                btn.innerHTML = btn.classList.contains('active') ? '&#9829;' : '&#9825;';
                btn.style.color = btn.classList.contains('active') ? '#e53e3e' : '#ffffff';
            });
        });
    },

    renderEmptyState(container) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center; width: 100%; color: #8c9ba5; font-size: 0.85rem;">
                No featured items published yet.
            </div>
        `;
    },

    renderErrorState(container) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center; width: 100%; color: #f87171; font-size: 0.85rem;">
                Failed to load featured products from server.
            </div>
        `;
    }
};

window.HomePage = HomePage;
                    
