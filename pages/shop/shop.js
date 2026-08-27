import { CONFIG } from '../../config.js';

export const ShopPage = {
    cachedPosts: null,
    activeCategory: 'all',
    searchQuery: '',

    // Sample fallback data using real luxury boutique imagery from your screenshot
    defaultProducts: [
        { id: 1, title: 'Royal Black Embroidered Suit', price: 'Rs. 2,850', category: 'unstitched', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop' },
        { id: 2, title: 'Beige Luxury Embroidered Suit', price: 'Rs. 2,650', category: 'unstitched', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop' },
        { id: 3, title: 'Emerald Green Embroidered Suit', price: 'Rs. 2,850', category: 'unstitched', image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=600&auto=format&fit=crop' },
        { id: 4, title: 'Maroon Embroidered Suit', price: 'Rs. 2,650', category: 'unstitched', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop' },
        { id: 5, title: 'Navy Blue Embroidered Suit', price: 'Rs. 2,850', category: 'unstitched', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop' },
        { id: 6, title: 'Grey Embroidered Suit', price: 'Rs. 2,650', category: 'unstitched', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop' }
    ],

    async render() {
        setTimeout(() => this.init(), 0);

        try {
            const response = await fetch('./pages/shop/shop.html');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.text();
        } catch (error) {
            console.error("Error loading shop template:", error);
            return `<div style="padding: 80px 20px; text-align: center; color: #ffffff;">
                <h3>Error loading Shop page</h3>
                <p style="color: #8c9ba5; font-size: 0.85rem; margin-top: 8px;">${error.message}</p>
            </div>`;
        }
    },

    async init() {
        this.bindEvents();
        await this.loadPosts();
    },

    bindEvents() {
        // Handle Pill Click Navigation
        const pills = document.querySelectorAll('.pill-btn');
        pills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                pills.forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
                this.activeCategory = e.target.getAttribute('data-category');
                this.renderFeed();
            });
        });

        // Search Input Filter
        const searchInput = document.getElementById('shop-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.renderFeed();
            });
        }
    },

    async loadPosts(forceRefresh = false) {
        const feedContainer = document.getElementById('shop-feed');
        if (!feedContainer) return;

        if (this.cachedPosts && !forceRefresh) {
            this.renderFeed();
            return;
        }

        try {
            if (CONFIG && CONFIG.API_URL) {
                const response = await fetch(CONFIG.API_URL);
                const posts = await response.json();
                this.cachedPosts = (posts && posts.length > 0) ? posts : this.defaultProducts;
            } else {
                this.cachedPosts = this.defaultProducts;
            }
        } catch (error) {
            console.warn("API unavailable, falling back to local products:", error);
            this.cachedPosts = this.defaultProducts;
        }

        this.renderFeed();
    },

    renderFeed() {
        const feedContainer = document.getElementById('shop-feed');
        if (!feedContainer) return;

        let filtered = this.cachedPosts || this.defaultProducts;

        // Apply Search Filter
        if (this.searchQuery) {
            filtered = filtered.filter(p => 
                (p.title || p.name || '').toLowerCase().includes(this.searchQuery)
            );
        }

        // 1. Render Landing View (If category is 'all' and no active search)
        if (this.activeCategory === 'all' && !this.searchQuery) {
            feedContainer.innerHTML = this.renderLandingHtml();
            this.bindLandingCategoryClicks();
            return;
        }

        // 2. Filter products by category if selected
        if (this.activeCategory !== 'all') {
            filtered = filtered.filter(p => 
                (p.category || 'unstitched').toLowerCase() === this.activeCategory.toLowerCase()
            );
        }

        // 3. Render 2-Column Product Grid View
        const categoryName = this.getCategoryDisplayName(this.activeCategory);

        if (filtered.length === 0) {
            feedContainer.innerHTML = `
                <div style="text-align:center; padding: 60px 20px; color:#8c9ba5;">
                    <p style="font-size: 0.9rem;">No products found in this collection.</p>
                </div>
            `;
            return;
        }

        feedContainer.innerHTML = `
            <div class="category-view-header">
                <h2 class="category-view-title">${categoryName}</h2>
                <span class="category-view-count">${filtered.length} Items</span>
            </div>
            <div class="shop-products-grid">
                ${filtered.map(product => this.renderProductCard(product)).join('')}
            </div>
        `;

        this.bindWishlistBtns();
    },

    renderLandingHtml() {
        return `
            <!-- Landing Hero Card -->
            <div class="shop-landing-hero" style="background-image: url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop');">
                <div class="shop-landing-overlay"></div>
                <div class="shop-landing-content">
                    <span class="shop-landing-tagline">Premium Fashion</span>
                    <h2 class="shop-landing-title">Discover Timeless Beauty</h2>
                    <p class="shop-landing-subtext">Crafted for Comfort, Designed for You.</p>
                </div>
            </div>

            <!-- Shop By Category Grid -->
            <div class="section-header" style="margin-top: 20px;">
                <span class="ornament">☙</span>
                <h2 class="section-title">Shop By Category</h2>
                <span class="ornament">❧</span>
            </div>

            <div class="collections-grid" style="grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px;">
                <div class="category-card" data-cat="unstitched" style="height: 190px; cursor: pointer;">
                    <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop" alt="Unstitched Suits">
                    <div class="category-card-overlay"></div>
                    <div class="category-icon-wrapper">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path></svg>
                    </div>
                    <span class="category-card-title">Unstitched Suits</span>
                    <span class="category-card-link">Explore Collection &#10095;</span>
                </div>

                <div class="category-card" data-cat="kurtis" style="height: 190px; cursor: pointer;">
                    <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop" alt="Kurtis">
                    <div class="category-card-overlay"></div>
                    <div class="category-icon-wrapper">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"></path></svg>
                    </div>
                    <span class="category-card-title">Ready to Wear Kurtis</span>
                    <span class="category-card-link">Explore Collection &#10095;</span>
                </div>

                <div class="category-card" data-cat="abayas" style="height: 190px; cursor: pointer;">
                    <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400&auto=format&fit=crop" alt="Abayas">
                    <div class="category-card-overlay"></div>
                    <div class="category-icon-wrapper">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a4 4 0 0 0-4 4v16h8V6a4 4 0 0 0-4-4z"></path></svg>
                    </div>
                    <span class="category-card-title">Abayas</span>
                    <span class="category-card-link">Explore Collection &#10095;</span>
                </div>

                <div class="category-card" data-cat="shawls" style="height: 190px; cursor: pointer;">
                    <img src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=400&auto=format&fit=crop" alt="Shawls">
                    <div class="category-card-overlay"></div>
                    <div class="category-icon-wrapper">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <span class="category-card-title">Shawls</span>
                    <span class="category-card-link">Explore Collection &#10095;</span>
                </div>
            </div>

            <!-- Why Shop With Us -->
            <div class="section-header">
                <span class="ornament">☙</span>
                <h2 class="section-title">Why Shop With Us?</h2>
                <span class="ornament">❧</span>
            </div>

            <div class="why-shop-grid">
                <div class="why-shop-card">
                    <div class="why-shop-icon">★</div>
                    <span class="why-shop-label">Premium Quality</span>
                </div>
                <div class="why-shop-card">
                    <div class="why-shop-icon">✓</div>
                    <span class="why-shop-label">Trusted Brand</span>
                </div>
                <div class="why-shop-card">
                    <div class="why-shop-icon">🚚</div>
                    <span class="why-shop-label">Fast & Safe Delivery</span>
                </div>
                <div class="why-shop-card">
                    <div class="why-shop-icon">🎧</div>
                    <span class="why-shop-label">Customer Support</span>
                </div>
            </div>
        `;
    },

    renderProductCard(product) {
        const imgSrc = product.image_url || product.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop';
        const title = product.title || product.name || 'Embroidered Suit';
        const price = product.price ? (product.price.toString().includes('Rs') ? product.price : `Rs. ${product.price}`) : 'Rs. 2,850';

        return `
            <div class="shop-product-card">
                <div class="shop-product-image">
                    <img src="${imgSrc}" alt="${title}">
                    <button class="shop-wishlist-btn" aria-label="Add to Wishlist">&#9825;</button>
                </div>
                <div class="shop-product-info">
                    <span class="shop-product-name">${title}</span>
                    <span class="shop-product-price">${price}</span>
                </div>
            </div>
        `;
    },

    bindLandingCategoryClicks() {
        const catCards = document.querySelectorAll('.category-card[data-cat]');
        catCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetCat = card.getAttribute('data-cat');
                const pillToActivate = document.querySelector(`.pill-btn[data-category="${targetCat}"]`);
                if (pillToActivate) {
                    pillToActivate.click();
                }
            });
        });
    },

    bindWishlistBtns() {
        const btns = document.querySelectorAll('.shop-wishlist-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                btn.classList.toggle('active');
                btn.innerHTML = btn.classList.contains('active') ? '&#9829;' : '&#9825;';
                btn.style.color = btn.classList.contains('active') ? '#e53e3e' : '#ffffff';
            });
        });
    },

    getCategoryDisplayName(catKey) {
        switch (catKey.toLowerCase()) {
            case 'unstitched': return 'Unstitched Suits';
            case 'kurtis': return 'Ready To Wear Kurtis';
            case 'abayas': return 'Abayas';
            case 'shawls': return 'Shawls';
            default: return 'All Products';
        }
    }
};

window.ShopPage = ShopPage;
                    
